import {TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {HouseDetailComponent} from './house-detail.component';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {HouseStoreService} from '../stores/house-store.service';
import {ActivatedRoute, RouterModule, Routes} from '@angular/router';
import {ExtractService} from '../../core/extract/extract.service';
import {HousesComponent} from '../houses.component';
import {HouseEmptyComponent} from '../house-empty/house-empty.component';
import {CharacterDetailComponent} from '../character-detail/character-detail.component';
import {MatCardModule, MatExpansionModule, MatIconModule, MatListModule, MatTooltipModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {House} from '../../models/house';

@Injectable()
class MockIceAndFireService {
}


@Injectable()
class MockExtractService {
}

describe('HouseDetailComponent', () => {
  let fixture;
  let component;
  const housesRoutes: Routes = [{
    path: '', component: HousesComponent, children: [
      {path: '', component: HouseEmptyComponent},
      {path: ':index', component: HouseDetailComponent},
    ]
  }];
  const mockHouse: House = JSON.parse('{"index":7,"cadetBranchesDetails":[],"url":"https://anapioficeandfire.com/api/houses/7","name":"House Arryn of the Eyrie","region":"The Vale","coatOfArms":"A sky-blue falcon soaring against a white moon, on a sky-blue field(Bleu celeste, upon a plate a falcon volant of the field)","words":"As High as Honor","titles":["King of Mountain and Vale (formerly)","Lord of the Eyrie","Defender of the Vale","Warden of the East"],"seats":["The Eyrie (summer)","Gates of the Moon (winter)"],"currentLord":"https://anapioficeandfire.com/api/characters/894","heir":"https://anapioficeandfire.com/api/characters/477","overlord":"https://anapioficeandfire.com/api/houses/16","founded":"Coming of the Andals","founder":"https://anapioficeandfire.com/api/characters/144","diedOut":"","ancestralWeapons":["Brisingr","Haudruff"],"cadetBranches":["https://anapioficeandfire.com/api/houses/6"],"swornMembers":["https://anapioficeandfire.com/api/characters/49","https://anapioficeandfire.com/api/characters/92","https://anapioficeandfire.com/api/characters/93","https://anapioficeandfire.com/api/characters/107","https://anapioficeandfire.com/api/characters/223","https://anapioficeandfire.com/api/characters/265","https://anapioficeandfire.com/api/characters/300","https://anapioficeandfire.com/api/characters/356","https://anapioficeandfire.com/api/characters/477","https://anapioficeandfire.com/api/characters/508","https://anapioficeandfire.com/api/characters/540","https://anapioficeandfire.com/api/characters/548","https://anapioficeandfire.com/api/characters/558","https://anapioficeandfire.com/api/characters/572","https://anapioficeandfire.com/api/characters/688","https://anapioficeandfire.com/api/characters/894","https://anapioficeandfire.com/api/characters/1068","https://anapioficeandfire.com/api/characters/1193","https://anapioficeandfire.com/api/characters/1280","https://anapioficeandfire.com/api/characters/1443","https://anapioficeandfire.com/api/characters/1655","https://anapioficeandfire.com/api/characters/1693","https://anapioficeandfire.com/api/characters/1715","https://anapioficeandfire.com/api/characters/1884"]}');
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule.forRoot(housesRoutes),
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatTooltipModule
      ],
      declarations: [HouseDetailComponent,
        CharacterDetailComponent,
        HousesComponent,
        HouseEmptyComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({index: '1'})}},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HouseDetailComponent);
    component = fixture.debugElement.componentInstance;
    component.house = mockHouse;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });


  it('should run #ngOnInit()', () => {
    let houseStoreService = fixture.debugElement.injector.get(HouseStoreService);
    spyOn(houseStoreService, 'detailedHouseChanged').and.returnValue(of(<House>mockHouse));
    component.ngOnInit();
  });

  it('should run #ngOnDestroy()', async () => {
    component.ngOnDestroy();
  });

  it('should run #subscribeToChanges()', async () => {
    const houseStoreService = fixture.debugElement.injector.get(HouseStoreService);
    delete component.house;
    spyOn(houseStoreService, 'detailedHouseChanged').and.returnValue(of(<House>mockHouse));
    component.subscribeToChanges();
    expect(component.detailedHouseChangeSubscription).toBeTruthy();
    houseStoreService.detailedHouseChanged.next(<House>mockHouse);
    expect(component.house).toBeTruthy();
  });

  it('should run #setDetailedHouse()', async () => {
    let iceAndFireService = fixture.debugElement.injector.get(IceAndFireService);
    spyOn(iceAndFireService, 'fetchHouse');
    component.setDetailedHouse();
  });

  it('should run #fetchDetails()', async () => {
    let extractService = fixture.debugElement.injector.get(ExtractService);
    const result = component.fetchDetails();
  });

  it('should run #fetchOverlordDetails()', async () => {
    component.fetchOverlordDetails();
  });

  it('should run #fetchDetailedCadetBranches()', async () => {
    component.fetchDetailedCadetBranches();
  });

  it('should run #fetchCurrentLordDetails()', async () => {
    component.fetchCurrentLordDetails();
  });

  it('should run #fetchHeirDetails()', async () => {
    component.fetchHeirDetails();
  });

  it('should run #fetchFounderDetails()', async () => {
    component.fetchFounderDetails();
  });

  it('should run #fetchSwornMemberDetails()', async () => {
    component.fetchSwornMemberDetails();
  });

  it('should run #fetchCharacterDetails()', async () => {
    const result = component.fetchCharacterDetails('https://anapioficeandfire.com/api/characters/1');
  });

  it('should run #removePendingPromises()', async () => {
    component.removePendingPromises();
  });

  it('should run #hasTitles()', async () => {
    const result = component.hasTitles();
  });

  it('should run #hasSeats()', async () => {
    const result = component.hasSeats();
  });

  it('should run #hasAncestralWeapons()', async () => {
    const result = component.hasAncestralWeapons();
  });

  it('should run #hasCadetBranches()', async () => {
    const result = component.hasCadetBranches();
  });

  it('should run #hasSwornMembers()', async () => {
    const result = component.hasSwornMembers();
  });

  it('should run #hasAdditionalInformation()', async () => {
    const result = component.hasAdditionalInformation();
  });

  it('should run #isInArray()', async () => {
    const result = component.isInArray([{name: 'peter'}], {name: 'peter'});
  });

});
