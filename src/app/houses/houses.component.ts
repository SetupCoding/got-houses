import {Component, OnInit} from '@angular/core';
import {IceAndFireService} from '../core/http/ice-and-fire.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html'
})
export class HousesComponent implements OnInit {

  constructor(private iceAndFireService: IceAndFireService) {
  }

  ngOnInit(): void {
    this.iceAndFireService.initializeHouseData();
  }
}
