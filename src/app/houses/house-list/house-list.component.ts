import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {House} from '../../model/house';
import {MatPaginator, MatTableDataSource} from '@angular/material';
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
  @ViewChild('tableContainer', {read: ElementRef}) public tableContainerRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  housesChangeSubscription: Subscription;

  constructor(private iceAndFireService: IceAndFireService, private houseStoreService: HouseStoreService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.subscribeToChanges();
    this.tableDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if (this.housesChangeSubscription) {
      this.housesChangeSubscription.unsubscribe();
    }
  }

  subscribeToChanges(): void {
    this.housesChangeSubscription = this.houseStoreService.housesChanged.subscribe((houses: House[]) => {
      this.maximumTableDataLength = this.houseStoreService.maximumHouseDataLength;
      this.tableDataSource = new MatTableDataSource<House>(houses);
      this.renderer.setProperty(this.tableContainerRef.nativeElement, 'scrollTop', 0);
    });
  }

  fetchHousesByPage(page: number): void {
    this.iceAndFireService.fetchHouses(page, this.pageSize);
  }

  onPaginateChange(event): void {
    this.pageSize = event.pageSize;
    this.fetchHousesByPage(event.pageIndex + 1);
  }

  applySearch(houseName: string): void {

  }
}
