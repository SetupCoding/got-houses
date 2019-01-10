import {Component, InjectionToken, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {House} from '../../model/house';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import {HouseStoreService} from '../service/house-store.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit, OnDestroy {
  tableDataSource = new MatTableDataSource<House>([]);
  displayedColumns: string[] = ['houseIndex', 'houseName'];
  pageSize = environment.defaultPageSize;
  pageSizeOptions = [5, 10, 25, 50];
  maximumTableDataLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  housesChangeSubscription: Subscription;

  constructor(private iceAndFireService: IceAndFireService, private houseStoreService: HouseStoreService) {
  }

  ngOnInit() {
    this.subscribeToChanges();
    this.tableDataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.housesChangeSubscription) {
      this.housesChangeSubscription.unsubscribe();
    }
  }

  subscribeToChanges() {
    this.housesChangeSubscription = this.houseStoreService.housesChanged.subscribe((houses: House[]) => {
      this.maximumTableDataLength = this.houseStoreService.maximumHouseDataLength;
      this.tableDataSource = new MatTableDataSource<House>(houses);
    });
  }

  fetchHousesByPage(page: number) {
    this.iceAndFireService.fetchHouses(page, this.pageSize);
  }

  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.fetchHousesByPage(event.pageIndex + 1);
  }

  applySearch(houseName: string) {

  }
}
