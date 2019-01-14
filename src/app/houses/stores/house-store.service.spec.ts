import {TestBed} from '@angular/core/testing';
import {HouseStoreService} from './house-store.service';
import {House} from '../../models/house';
import {ExtractService} from '../../core/extract/extract.service';

describe('HouseStoreService', () => {
  let service;
  let extractService;
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

  const mockHouseData = JSON.parse('{"url":"https://anapioficeandfire.com/api/houses/7",' +
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

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ExtractService]});
    extractService = TestBed.get(ExtractService);
    service = new HouseStoreService(extractService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #setHouses()', async () => {
    service.setHouses([mockHouse], false);
    expect(service.houses.length > 0).toBeTruthy();
  });
  it('should run #setHouses() with error', async () => {
    service.setHouses([], true);
    expect(service.hasError).toBeTruthy();
    expect(service.houses.length < 1).toBeTruthy();
  });
  it('should run set #detailedHouse', async () => {
    service._detailedHouse = mockHouse;
    expect(service._detailedHouse).toEqual(mockHouse);
  });
  it('should run #setDetailedHouse()', async () => {
    service.setDetailedHouse(mockHouse, false);
    expect(service.hasError).toBeFalsy();
  });

  it('should run #setDetailedHouse() with error', async () => {
    service.setDetailedHouse(mockHouse, true);
    expect(service.hasError).toBeTruthy();
  });

  it('should run #getHouseByIndex()', async () => {
    const mockHouseClone = {...mockHouse};
    mockHouseClone.index = 1;
    service.setHouses([mockHouse, mockHouseClone], false);
    const result = service.getHouseByIndex(7);
    expect(result).toEqual(mockHouse);
  });

  it('should run #mapHousesData()', async () => {
    const result = service.mapHousesData([mockHouseData]);
    expect(JSON.stringify(result)).toEqual(JSON.stringify([mockHouse]));
  });

});
