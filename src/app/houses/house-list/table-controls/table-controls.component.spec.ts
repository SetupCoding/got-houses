import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableControlsComponent} from './table-controls.component';

describe('TableControlsComponent', () => {
  let component: TableControlsComponent;
  let fixture: ComponentFixture<TableControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableControlsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #ngOnDestroy() without filterChangeSubscription', async () => {
    delete component.filterChangeSubscription;
    component.ngOnDestroy();
  });

  it('should run #subscribeToChanges()', async () => {
    component.subscribeToChanges();
    houseStoreService.housesChanged.next([mockHouse]);
    expect(component.maximumTableDataLength).toBe(0);
    expect(component.tableDataSource.data).toBeTruthy();
  });

  it('should run #subscribeToChanges() with error', async () => {
    component.subscribeToChanges();
    houseStoreService.hasError = true;
    houseStoreService.housesChanged.next([mockHouse]);
    expect(component.maximumTableDataLength).toBe(0);
    expect(component.tableDataSource.data).toBeTruthy();
  });

  it('should run #fetchHousesByPage()', async () => {
    component.fetchHousesByPage(1);
  });

  it('should run #adjustPaginator()', async () => {
    component.adjustPaginator();
  });
  it('should run #adjustPaginator() with paginationEvent', async () => {
    component.isPaginationEvent = true;
    component.adjustPaginator();
  });
  it('should run #onPaginateChange()', async () => {
    component.onPaginateChange(new Event('test'));
  });

  it('should run #hasFilters()', async () => {
    const result = component.hasFilters();
  });
});
