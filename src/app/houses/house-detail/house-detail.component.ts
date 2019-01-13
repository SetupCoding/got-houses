import {Component, OnDestroy, OnInit} from '@angular/core';
import {HouseStoreService} from '../house-store/house-store.service';
import {ActivatedRoute, Params} from '@angular/router';
import {House} from '../../models/house';
import {Subscription} from 'rxjs';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';

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
              private route: ActivatedRoute) {
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

  subscribeToChanges(): void {
    this.detailedHouseChangeSubscription = this.houseStoreService.detailedHouseChanged.subscribe((house: House) => {
      this.house = house;
      this.fetchDetailedCadetBranches();
    });
  }

  setDetailedHouse(): void {
    this.house = this.houseStoreService.getHouseByIndex(this.index);
    if (!this.house) {
      this.iceAndFireService.fetchHouse(this.index);
    } else {
      this.fetchDetailedCadetBranches();
    }
  }

  private fetchDetailedCadetBranches() {
    if (this.hasCadetBranches()) {
      this.house.cadetBranchesDetails = [];
      const cadetDetailRequestPromises = [];
      this.house.cadetBranches.forEach((cadetBranchUrl: string) => {
        const cadetBranchIndex = this.houseStoreService.extractIndexFromUrl(cadetBranchUrl);
        cadetDetailRequestPromises.push(this.iceAndFireService.fetchHouse(cadetBranchIndex, true));
      });
      Promise.all(cadetDetailRequestPromises).then((cadetBranchDetails) => {
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

  hasAdditionalInformation() {
    return this.hasTitles() || this.hasSeats() || this.hasAncestralWeapons() || this.hasCadetBranches();
  }


}
