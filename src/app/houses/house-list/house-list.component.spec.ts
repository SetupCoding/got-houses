import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseListComponent} from './house-list.component';
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
  MatTableModule
} from '@angular/material';
import {LoadingModule} from '../../core/loading/loading.module';
import {HouseFilterComponent} from '../house-filter/house-filter.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HouseFilterItemComponent} from '../house-filter/house-filter-item/house-filter-item.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HouseStoreService} from '../stores/house-store.service';
import {House} from '../../models/house';
import {of} from 'rxjs';
import {HouseFilterService} from '../house-filter/house-filter.service';
import {ChangeDetectorRef} from '@angular/core';
import {HouseFilter} from '../../models/house-filter';

describe('HouseListComponent', () => {
  let component: HouseListComponent;
  let fixture: ComponentFixture<HouseListComponent>;
  let houseStoreService: HouseStoreService;
  let houseFilterService: HouseFilterService;
  let changeDetectorRef: ChangeDetectorRef;
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
        HouseListComponent,
        HouseFilterComponent,
        HouseFilterItemComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {queryParams: of({filter: '{"hasWords":true}'})}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    houseStoreService = fixture.debugElement.injector.get(HouseStoreService);
    houseFilterService = fixture.debugElement.injector.get(HouseFilterService);
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
  });

  it('should create a component', () => {
    spyOn(houseStoreService, 'housesChanged').and.returnValue(of(<House>mockHouse));
    spyOn(houseFilterService, 'filtersChanged').and.returnValue(of(<HouseFilter>mockHouseFilter));
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
  });

  it('should run #ngOnDestroy()', async () => {
    component.ngOnDestroy();
  });
  it('should run #ngOnDestroy() without housesChangeSubscription', async () => {
    delete component.housesChangeSubscription;
    component.ngOnDestroy();
  });

  it('should run #subscribeToChanges()', async () => {
    component.subscribeToChanges();
    houseStoreService.housesChanged.next([mockHouse]);
    expect(component.tableDataSource.data).toBeTruthy();
  });

  it('should run #subscribeToChanges() with error', async () => {
    component.subscribeToChanges();
    houseStoreService.hasError = true;
    houseStoreService.housesChanged.next([mockHouse]);
    expect(component.tableDataSource.data).toBeTruthy();
  });


});
