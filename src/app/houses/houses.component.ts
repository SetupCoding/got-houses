import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IceAndFireService} from '../core/http/ice-and-fire.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  maxColumns: number;

  constructor(private iceAndFireService: IceAndFireService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.iceAndFireService.initializeHouseData();
    this.subscribeToChanges();
  }

  subscribeToChanges(): void {
    const windowSizeChanges = this.breakpointObserver.observe([
      '(max-width: 768px)'
    ]);

    windowSizeChanges.subscribe(result => {
      this.updateMaxColumns(result.matches);
    });
  }

  updateMaxColumns(isSmallScreen: boolean): void {
    this.maxColumns = isSmallScreen ? 1 : 2;
  }

}
