import {Component, OnDestroy, OnInit} from '@angular/core';
import {HouseStoreService} from '../house-store/house-store.service';
import {ActivatedRoute, Params} from '@angular/router';
import {House} from '../../models/house';
import {Subscription} from 'rxjs';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {SnackBarService} from '../../core/snack-bar/snack-bar.service';

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
              private snackBarService: SnackBarService) {
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
    });
  }

  setDetailedHouse(): void {
    this.house = this.houseStoreService.getHouseByIndex(this.index);
    if (!this.house) {
      this.iceAndFireService.fetchHouse(this.index);
    }
  }
}
