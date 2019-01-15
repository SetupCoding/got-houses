import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {House} from '../../models/house';
import {MatTableDataSource} from '@angular/material';
import {HouseStoreService} from '../stores/house-store.service';
import {Subscription} from 'rxjs';
import {HouseFilterService} from '../house-filter/house-filter.service';
import {SnackBarService} from '../../core/snack-bar/snack-bar.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit, OnDestroy {
  tableDataSource = new MatTableDataSource<House>([]);
  displayedColumns: string[] = ['houseIndex', 'houseName', 'houseRegion'];
  @ViewChild('tableContainer', {read: ElementRef}) public tableContainerRef: ElementRef;
  housesChangeSubscription: Subscription;

  constructor(private iceAndFireService: IceAndFireService,
              private houseStoreService: HouseStoreService,
              private houseFilterService: HouseFilterService,
              private renderer: Renderer2,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.subscribeToChanges();
  }

  ngOnDestroy(): void {
    if (this.housesChangeSubscription) {
      this.housesChangeSubscription.unsubscribe();
    }
  }

  subscribeToChanges(): void {
    this.housesChangeSubscription = this.houseStoreService.housesChanged.subscribe((houses: House[]) => {
      this.tableDataSource = new MatTableDataSource<House>(houses);
      if (this.houseStoreService.hasError) {
        this.snackBarService.showSnackBar();
      }
      this.renderer.setProperty(this.tableContainerRef.nativeElement, 'scrollTop', 0);
    });
  }
}
