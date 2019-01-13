import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {House} from '../../models/house';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HouseStoreService} from '../house-store/house-store.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
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
  pageSize = environment.defaultPageSize;
  pageSizeOptions = [5, 10, 25, 50];
  maximumTableDataLength = 0;

  @ViewChild('tableContainer', {read: ElementRef}) public tableContainerRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  housesChangeSubscription: Subscription;
  isPaginationEvent = false;

  constructor(private iceAndFireService: IceAndFireService,
              private houseStoreService: HouseStoreService,
              private houseFilterService: HouseFilterService,
              private renderer: Renderer2,
              private snackBarService: SnackBarService) {
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
      if (this.houseStoreService.hasError) {
        this.snackBarService.showSnackBar();
      }
      this.adjustPaginator();
      this.renderer.setProperty(this.tableContainerRef.nativeElement, 'scrollTop', 0);
    });
  }

  fetchHousesByPage(page: number): void {
    this.iceAndFireService.fetchHouses(page, this.pageSize);
  }

  adjustPaginator(): void {
    if (!this.isPaginationEvent) {
      this.paginator.pageIndex = 0;
    }
    this.isPaginationEvent = false;
  }

  onPaginateChange(event): void {
    this.pageSize = event.pageSize;
    this.isPaginationEvent = true;
    this.fetchHousesByPage(event.pageIndex + 1);
  }

  hasFilters(): boolean {
    return !this.houseFilterService.isEmptyObject();
  }
}
