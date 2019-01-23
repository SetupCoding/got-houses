import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableControlsComponent} from './table-controls.component';
import {HouseStoreService} from '../../stores/house-store.service';
import {HouseFilterService} from '../../house-filter/house-filter.service';
import {ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Type} from '@angular/core';
import {HouseFilter} from '../../../models/house-filter';
import {House} from '../../../models/house';
import {
  MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableDataSource,
  MatTableModule
} from '@angular/material';
import {HouseFilterComponent} from '../../house-filter/house-filter.component';
import {HouseFilterItemComponent} from '../../house-filter/house-filter-item/house-filter-item.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {of} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HouseListComponent} from '../house-list.component';
import {LoadingModule} from '../../../core/loading/loading.module';

@Component({
  selector: 'app-house-list',
  template: '<app-table-controls [tableContainerRef]="tableContainerRef" [tableDataSource]="tableDataSource">' +
    '</app-table-controls> <div class="mat-elevation-z3 table-container" #tableContainer>' +
    '  <mat-table mat-table class="housesTable" [dataSource]="tableDataSource">' +
    '    <ng-container matColumnDef="houseIndex">' +
    '      <mat-header-cell mat-header-cell *matHeaderCellDef>#</mat-header-cell>' +
    '      <mat-cell mat-cell *matCellDef="let house">{{house.index}}</mat-cell>' +
    '    </ng-container>' +
    '    <ng-container matColumnDef="houseName">' +
    '      <mat-header-cell mat-header-cell *matHeaderCellDef>Name</mat-header-cell>' +
    '      <mat-cell mat-cell *matCellDef="let house">{{house.name}}</mat-cell>' +
    '    </ng-container>' +
    '    <ng-container matColumnDef="houseRegion">' +
    '      <mat-header-cell mat-header-cell *matHeaderCellDef>Region</mat-header-cell>' +
    '      <mat-cell mat-cell *matCellDef="let house">{{house.region}}</mat-cell>' +
    '    </ng-container>' +
    '    <mat-header-row mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></mat-header-row>' +
    '    <mat-row matRipple [routerLink]="[row.index]" queryParamsHandling="merge" routerLinkActive="highlighted"' +
    '             *matRowDef="let row; columns: displayedColumns;"></mat-row>' +
    '  </mat-table>' +
    '</div>'
})
class WrapperComponent {
  tableDataSource = new MatTableDataSource<House>([]);
  // @ViewChild('tableContainer', {read: ElementRef}) public tableContainerRef: ElementRef;
}

describe('TableControlsComponent', () => {
  let houseStoreService: HouseStoreService;
  let houseFilterService: HouseFilterService;
  let changeDetectorRef: ChangeDetectorRef;

  let component: TableControlsComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const mockHouse: House = JSON.parse('{"index":7,"cadetBranchesDetails":[],"url":"https://anapioficeandfire.com/api/houses/7",' +
    '"name":"House Arryn of the Eyrie","region":"The Vale","coatOfArms":"A sky-blue falcon soaring against a white moon, on a sky-blue ' +
    'field(Bleu celeste, upon a plate a falcon volant of the field)","words":"As High as Honor","titles":["King of Mountain and Vale ' +
    '(formerly)","Lord of the Eyrie","Defender of the Vale","Warden of the East"],"seats":["The Eyrie (summer)","Gates of the Moon ' +
    '(winter)"],"currentLord":"https://anapioficeandfire.com/api/characters/894","heir":' +
    '"https://anapioficeandfire.com/api/characters/477","overlord":' +
    '"https://anapioficeandfire.com/api/houses/16","founded":"Coming of the Andals",' +
    '"founder":"https://anapioficeandfire.com/api/characters/144","diedOut":"",' +
    '"ancestralWeapons":["Brisingr","Haudruff"],"cadetBranches":' +
    '["https://anapioficeandfire.com/api/houses/6","https://anapioficeandfire.com/api/houses/5"],"swornMembers":' +
    '["https://anapioficeandfire.com/api/characters/49","https://anapioficeandfire.com/api/characters/92",' +
    '"https://anapioficeandfire.com/api/characters/93","https://anapioficeandfire.com/api/characters/107",' +
    '"https://anapioficeandfire.com/api/characters/223","https://anapioficeandfire.com/api/characters/265",' +
    '"https://anapioficeandfire.com/api/characters/300","https://anapioficeandfire.com/api/characters/356",' +
    '"https://anapioficeandfire.com/api/characters/477","https://anapioficeandfire.com/api/characters/508",' +
    '"https://anapioficeandfire.com/api/characters/540","https://anapioficeandfire.com/api/characters/548",' +
    '"https://anapioficeandfire.com/api/characters/558","https://anapi' +
    'oficeandfire.com/api/characters/572","https://anapioficeandfire.com/api/characters/688",' +
    '"https://anapioficeandfire.com/api/characters/894","https://anapioficeandfire.com/api/characters/1068",' +
    '"https://anapioficeandfire.com/api/characters/1193","https://anapioficeandf' +
    'ire.com/api/characters/1280","https://anapioficeandfire.com/api/characters/1443",' +
    '"https://anapioficeandfire.com/api/characters/1655",' +
    '"https://anapioficeandfire.com/api/characters/1693","https://anapioficeandfire.com/api/characters/1715",' +
    '"https://anapioficeandfire.com/api/characters/1884"]}');
  const mockHouseFilter: HouseFilter = {
    name: 'House Algood',
    region: '',
    words: '',
    hasWords: false,
    hasTitles: false,
    hasSeats: false,
    hasDiedOut: false,
    hasAncestralWeapons: false,
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoadingModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatIconModule,
        MatExpansionModule,
        MatTableModule,
        MatSelectModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule.forRoot([])
      ],
      declarations: [
        WrapperComponent,
        HouseListComponent,
        HouseFilterComponent,
        HouseFilterItemComponent,
        TableControlsComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: ActivatedRoute, useValue: {queryParams: of({filter: '{"hasWords":true}'})}},
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
    houseStoreService = fixture.debugElement.injector.get(HouseStoreService);
    houseFilterService = fixture.debugElement.injector.get(HouseFilterService);
    changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>);
  }));

  it('should create a component', () => {
    spyOn(houseStoreService, 'housesChanged').and.returnValue(of(<House>mockHouse));
    spyOn(houseFilterService, 'filtersChanged').and.returnValue(of(<HouseFilter>mockHouseFilter));
    expect(component).toBeTruthy();
  });
  it('should run #ngOnDestroy() without filterChangeSubscription', async () => {
    delete component.filterChangeSubscription;
    component.ngOnDestroy();
  });
  it('should run #ngOnDestroy() without housesChangeSubscription', async () => {
    delete component.housesChangeSubscription;
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
    expect(result).toBe(true);
  });
});

