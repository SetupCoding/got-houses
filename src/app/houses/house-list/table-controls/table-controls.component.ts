import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HouseFilterService} from '../../house-filter/house-filter.service';
import {HouseStoreService} from '../../stores/house-store.service';
import {House} from '../../../models/house';
import {HouseFilter} from '../../../models/house-filter';
import {IceAndFireService} from '../../../core/http/ice-and-fire.service';

@Component({
  selector: 'app-table-controls',
  templateUrl: './table-controls.component.html',
  styleUrls: ['./table-controls.component.scss']
})
export class TableControlsComponent implements OnInit, OnDestroy {
  @Input() tableContainerRef;
  @Input() tableDataSource;
  pageSize = environment.defaultPageSize;
  pageSizeOptions = [5, 10, 25, 50];
  maximumTableDataLength = 0;
  filterChangeSubscription: Subscription;
  housesChangeSubscription: Subscription;
  isPaginationEvent = false;
  activeFilterClass: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private iceAndFireService: IceAndFireService,
              private houseFilterService: HouseFilterService,
              private houseStoreService: HouseStoreService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activeFilterClass = this.activeFilter();
    this.subscribeToChanges();
    this.tableDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if (this.housesChangeSubscription) {
      this.housesChangeSubscription.unsubscribe();
    }
    if (this.filterChangeSubscription) {
      this.filterChangeSubscription.unsubscribe();
    }
  }

  subscribeToChanges(): void {
    this.filterChangeSubscription = this.houseFilterService.filtersChanged.subscribe((filter: HouseFilter) => {
      this.activeFilterClass = this.activeFilter();
      this.changeDetector.detectChanges();
    });
    this.housesChangeSubscription = this.houseStoreService.housesChanged.subscribe((houses: House[]) => {
      this.maximumTableDataLength = this.houseStoreService.maximumHouseDataLength;
      this.adjustPaginator();
    });
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

  activeFilter(): string {
    return this.hasFilters() ? 'mat-accent' : '';
  }

  fetchHousesByPage(page: number): void {
    this.iceAndFireService.fetchHouses(page, this.pageSize);
  }
}
