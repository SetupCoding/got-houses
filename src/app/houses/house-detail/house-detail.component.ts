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
    this.house = this.houseStoreService.getHouseByIndex(this.index);
    if (!this.house) {
      this.iceAndFireService.fetchHouse(this.index);
    } else {
      this.fetchDetails();
    }
  }

  private fetchDetails() {
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
      this.iceAndFireService.fetchHouse(overlordIndex, true).then((overlordDetails: House) => {
        this.house.overlordDetails = {index: overlordDetails.index, name: overlordDetails.name};
      });
    }
  }

  private fetchDetailedCadetBranches(): void {
    if (this.hasCadetBranches()) {
      this.house.cadetBranchesDetails = [];
      const cadetDetailRequestPromises = [];
      this.house.cadetBranches.forEach((cadetBranchUrl: string) => {
        const cadetBranchIndex = this.extractService.extractIndexFromUrl(cadetBranchUrl);
        cadetDetailRequestPromises.push(this.iceAndFireService.fetchHouse(cadetBranchIndex, true));
      });
      Promise.all(cadetDetailRequestPromises).then((cadetBranchDetails: House[]) => {
        cadetBranchDetails.forEach((cadetBranchDetail: House) => {
          if (cadetBranchDetail) {
            this.house.cadetBranchesDetails.push({index: cadetBranchDetail.index, name: cadetBranchDetail.name});
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
      this.fetchCharacterDetails(this.house.currentLord).then((character: Character) => {
        this.house.currentLordDetails = character;
      });
    }
  }

  fetchHeirDetails(): void {
    if (this.house.heir) {
      delete this.house.heirDetails;
      this.fetchCharacterDetails(this.house.heir).then((character: Character) => {
        this.house.heirDetails = character;
      });
    }
  }

  fetchFounderDetails(): void {
    if (this.house.founder) {
      delete this.house.founderDetails;
      this.fetchCharacterDetails(this.house.founder).then((character: Character) => {
        this.house.founderDetails = character;
      });
    }
  }

  fetchSwornMemberDetails(): void {
    if (this.hasSwornMembers()) {
      this.house.swornMembersDetails = [];
      const swornMembersDetailRequestPromises = [];
      this.house.swornMembers.forEach((swornMemberUrl: string) => {
        swornMembersDetailRequestPromises.push(this.fetchCharacterDetails(swornMemberUrl));
      });
      Promise.all(swornMembersDetailRequestPromises).then((characters: Character[]) => {
        characters.forEach((character: Character) => {
          this.house.swornMembersDetails.push(character);
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
}
