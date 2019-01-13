import {Component, OnDestroy, OnInit} from '@angular/core';
import {HouseStoreService} from '../stores/house-store.service';
import {ActivatedRoute, Params} from '@angular/router';
import {House} from '../../models/house';
import {Subscription} from 'rxjs';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {ExtractService} from '../../core/extract/extract.service';
import {Character} from '../../models/character';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  house: House;
  index: number;
  detailedHouseChangeSubscription: Subscription;
  cadetDetailRequestPromises: Promise<House>[];
  swornMembersDetailRequestPromises: Promise<Character>[];
  overlordDetailsRequestPromise: Promise<House>;
  currentLordDetailsRequestPromise: Promise<Character>;
  heirDetailsRequestPromise: Promise<Character>;
  founderDetailsRequestPromise: Promise<Character>;

  constructor(private iceAndFireService: IceAndFireService,
              private houseStoreService: HouseStoreService,
              private route: ActivatedRoute,
              private extractService: ExtractService) {
  }

  ngOnInit(): void {
    this.subscribeToChanges();
    this.route.params.subscribe((params: Params) => {
      const indexParameter = parseInt(params['index'], 10);
      if (indexParameter !== this.index) {
        this.index = indexParameter;
        this.setDetailedHouse();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.detailedHouseChangeSubscription) {
      this.detailedHouseChangeSubscription.unsubscribe();
    }
  }

  private subscribeToChanges(): void {
    this.detailedHouseChangeSubscription = this.houseStoreService.detailedHouseChanged.subscribe((house: House) => {
      this.house = house;
      this.fetchDetails();
    });
  }

  private setDetailedHouse(): void {
    this.iceAndFireService.fetchHouse(this.index);
  }

  private fetchDetails() {
    this.removePendingPromises();
    this.fetchOverlordDetails();
    this.fetchDetailedCadetBranches();
    this.fetchCurrentLordDetails();
    this.fetchHeirDetails();
    this.fetchFounderDetails();
    this.fetchSwornMemberDetails();
  }

  private fetchOverlordDetails(): void {
    if (this.house.overlord) {
      delete this.house.overlordDetails;
      const overlordIndex = this.extractService.extractIndexFromUrl(this.house.overlord);
      this.overlordDetailsRequestPromise = this.iceAndFireService.fetchHouse(overlordIndex, true);
      this.overlordDetailsRequestPromise.then((overlordDetails: House) => {
        this.house.overlordDetails = {index: overlordDetails.index, name: overlordDetails.name};
      });
    }
  }

  private fetchDetailedCadetBranches(): void {
    if (this.hasCadetBranches()) {

      this.cadetDetailRequestPromises = [];
      this.house.cadetBranches.forEach((cadetBranchUrl: string) => {
        const cadetBranchIndex = this.extractService.extractIndexFromUrl(cadetBranchUrl);
        this.cadetDetailRequestPromises.push(this.iceAndFireService.fetchHouse(cadetBranchIndex, true));
      });
      Promise.all(this.cadetDetailRequestPromises).then((cadetBranchDetails: House[]) => {
        this.house.cadetBranchesDetails = [];
        cadetBranchDetails.forEach((cadetBranchDetail: House) => {
          if (cadetBranchDetail) {
            const cadet = {index: cadetBranchDetail.index, name: cadetBranchDetail.name};
            if (!this.isInArray(this.house.cadetBranchesDetails, cadet)) {
              this.house.cadetBranchesDetails.push(cadet);
            }
            this.house.cadetBranchesDetails.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
          }
        });
      });
    }
  }

  fetchCurrentLordDetails(): void {
    if (this.house.currentLord) {
      delete this.house.currentLordDetails;
      this.currentLordDetailsRequestPromise = this.fetchCharacterDetails(this.house.currentLord);
      this.currentLordDetailsRequestPromise.then((character: Character) => {
        this.house.currentLordDetails = character;
      });
    }
  }

  fetchHeirDetails(): void {
    if (this.house.heir) {
      delete this.house.heirDetails;
      this.heirDetailsRequestPromise = this.fetchCharacterDetails(this.house.heir);
      this.heirDetailsRequestPromise.then((character: Character) => {
        this.house.heirDetails = character;
      });
    }
  }

  fetchFounderDetails(): void {
    if (this.house.founder) {
      delete this.house.founderDetails;
      this.founderDetailsRequestPromise = this.fetchCharacterDetails(this.house.founder);
      this.founderDetailsRequestPromise.then((character: Character) => {
        this.house.founderDetails = character;
      });
    }
  }

  fetchSwornMemberDetails(): void {
    if (this.hasSwornMembers()) {
      this.swornMembersDetailRequestPromises = [];
      this.house.swornMembers.forEach((swornMemberUrl: string) => {
        this.swornMembersDetailRequestPromises.push(this.fetchCharacterDetails(swornMemberUrl));
      });
      Promise.all(this.swornMembersDetailRequestPromises).then((characters: Character[]) => {
        this.house.swornMembersDetails = [];
        characters.forEach((character: Character) => {
          if (!this.isInArray(this.house.swornMembersDetails, character)) {
            this.house.swornMembersDetails.push(character);
          }
          this.house.swornMembersDetails.sort((a, b) => {
            const fullName = a.titles.join() + a.name;
            return fullName.localeCompare(b.titles.join() + b.name);
          });
        });
      });
    }
  }

  fetchCharacterDetails(characterUrl: string): Promise<Character> {
    return new Promise((resolve) => {
      const characterIndex = this.extractService.extractIndexFromUrl(characterUrl);
      this.iceAndFireService.fetchCharacter(characterIndex).then((characterDetailsData: Character) => {
        resolve(characterDetailsData);
      });
    });
  }

  removePendingPromises(): void {
    this.cadetDetailRequestPromises = [];
    this.swornMembersDetailRequestPromises = [];
    delete this.overlordDetailsRequestPromise;
    delete this.currentLordDetailsRequestPromise;
    delete this.heirDetailsRequestPromise;
    delete this.founderDetailsRequestPromise;
  }

  hasTitles(): boolean {
    return this.house.titles[0] !== '';
  }

  hasSeats(): boolean {
    return this.house.seats[0] !== '';
  }

  hasAncestralWeapons() {
    return this.house.ancestralWeapons[0] !== '';
  }

  hasCadetBranches() {
    return this.house.cadetBranches.length > 1;
  }

  hasSwornMembers() {
    return this.house.swornMembers.length > 1;
  }

  hasAdditionalInformation() {
    return this.hasTitles() || this.hasSeats() || this.hasAncestralWeapons() || this.hasCadetBranches() || this.hasSwornMembers();
  }

  isInArray(arrayToSearch, objectToFind): boolean {
    return arrayToSearch.find(member => member.index === objectToFind.index);
  }
}

