import {TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HouseFilterComponent} from './house-filter.component';
import {HouseFilterService} from './house-filter.service';
import {
  MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelect,
  MatSelectModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HouseFilterItemComponent} from './house-filter-item/house-filter-item.component';
import {of} from 'rxjs';
import {HouseFilter} from '../../models/house-filter';
import {ActivatedRoute, RouterModule, Routes} from '@angular/router';
import {HousesComponent} from '../houses.component';
import {HouseEmptyComponent} from '../house-empty/house-empty.component';
import {HouseDetailComponent} from '../house-detail/house-detail.component';


describe('HouseFilterComponent', () => {
  let fixture;
  let component;
  const housesRoutes: Routes = [{
    path: '', component: HousesComponent, children: [
      {path: '', component: HouseEmptyComponent},
      {path: ':index', component: HouseDetailComponent},
    ]
  }];
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(housesRoutes),
      ],
      declarations: [
        HousesComponent,
        HouseEmptyComponent,
        HouseDetailComponent,
        HouseFilterComponent,
        HouseFilterItemComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {queryParams: of({filter: '{"hasWords":true}'})}},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HouseFilterComponent);
    component = fixture.debugElement.componentInstance;
    component.subscribeToChanges();
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });


  it('should run #ngOnInit()', async () => {
    const houseFilterService = fixture.debugElement.injector.get(HouseFilterService);
    spyOn(houseFilterService, 'filtersChanged').and.returnValue(of(<HouseFilter>mockHouseFilter));
    const result = component.ngOnInit();
  });

  it('should run #ngOnDestroy()', async () => {
    const result = component.ngOnDestroy();
  });
  it('should run #ngOnDestroy() without filtersChangeSubscription', async () => {
    delete component.filtersChangeSubscription;
    component.ngOnDestroy();
  });

  it('should run #subscribeToChanges()', async () => {
    const houseFilterService = fixture.debugElement.injector.get(HouseFilterService);
    const route = fixture.debugElement.injector.get(ActivatedRoute);
    spyOn(houseFilterService, 'filtersChanged').and.returnValue(of(<HouseFilter>mockHouseFilter));
    component.subscribeToChanges();
    houseFilterService.filtersChanged.next(<HouseFilter>mockHouseFilter);
  });
  it('should run #subscribeToChanges() with empty filter', async () => {
    const houseFilterService = fixture.debugElement.injector.get(HouseFilterService);
    spyOn(houseFilterService, 'filtersChanged').and.returnValue(of(<HouseFilter>mockHouseFilter));
    const route = fixture.debugElement.injector.get(ActivatedRoute);
    expect(component.filter).toBeTruthy();
    component.resetFilters();
    expect(component.filter).toEqual({});
    component.filter = mockHouseFilter;
    expect(component.filter).toBeTruthy();
    houseFilterService.filtersChanged.next(<HouseFilter>{});
    expect(component.filter).toEqual(<HouseFilter>{});
  });

  it('should run #addFilter()', async () => {
    component.addFilter(<MatSelect>{value: {name: 'name', type: 'string'}}, 'peter', null);
    expect(component.filter).toEqual(<HouseFilter>{name: 'peter', hasWords: true});
  });
  it('should run #addFilter() with null filter', async () => {
    component.filter = null;
    component.addFilter(<MatSelect>{value: null}, 'peter', null);
    expect(component.filter).toEqual(null);
  });
  it('should run #addFilter() with empty filter object', async () => {
    component.filter = {};
    component.addFilter(<MatSelect>{value: null}, 'peter', null);
    expect(component.filter.name === 'peter' || component.filter.hasWords).toBeFalsy();
  });
  it('should add name filter House Algood', async () => {
    component.addFilter(<MatSelect>{value: {name: 'name', type: 'string'}}, 'House Algood', null);
    expect(component.filter).toEqual(<HouseFilter>{name: 'House Algood', hasWords: true});
  });
  it('should not add empty filter', async () => {
    component.addFilter(<MatSelect>{value: undefined}, 'peter', false);
    expect(component.filter).toEqual(<HouseFilter>{hasWords: true});
  });

  it('should run #applyFilters()', async () => {
    component.applyFilters(<MatSelect>{value: {name: 'House Algood'}}, 'House Algood', false);
  });

  it('should run #resetFilterFields()', async () => {
    component.selectedFilterType.value = 'mockvalue';
    component.filterInput.nativeElement.value = 'mockvalue';
    component.filterCheckbox.nativeElement.checked = true;
    component.resetFilterFields();
    expect(component.selectedFilterType.value).toBeFalsy();
    expect(component.filterInput.nativeElement.value).toBeFalsy();
    expect(component.filterCheckbox.nativeElement.checked).toBeFalsy();
  });

  it('should run #resetFilters()', async () => {
    component.selectedFilterType.value = 'mockvalue';
    component.filterInput.nativeElement.value = 'mockvalue';
    component.filterCheckbox.nativeElement.checked = true;
    component.resetFilters();
    expect(component.selectedFilterType.value).toBeFalsy();
    expect(component.filterInput.nativeElement.value).toBeFalsy();
    expect(component.filterCheckbox.nativeElement.checked).toBeFalsy();
    expect(component.filter).toEqual({});
  });

  it('should run #hasFilters()', async () => {
    const result = component.hasFilters({});
    expect(result).toBeFalsy();
  });
  it('should run #hasFilters()', async () => {
    const result = component.hasFilters(mockHouseFilter);
    expect(result).toBeTruthy();
  });
  it('should return [] on  #objectKeys() with undefined object', async () => {
    const result = component.objectKeys(undefined);
    expect(result.length < 1).toBeTruthy();
  });
});
