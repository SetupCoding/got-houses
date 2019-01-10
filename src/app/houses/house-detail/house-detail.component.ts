import {Component, OnInit} from '@angular/core';
import {HouseService} from '../service/house.service';
import {ActivatedRoute, Params} from '@angular/router';
import {House} from '../../model/house';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit {
  detailedHouse: House;
  index: number;

  constructor(private houseService: HouseService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = parseInt(params['index'], 10);
      this.detailedHouse = this.houseService.getHouseByIndex(this.index);
    });

  }

}
