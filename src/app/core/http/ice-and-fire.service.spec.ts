import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {IceAndFireService} from './ice-and-fire.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HouseFilter} from '../../models/house-filter';
import {HouseFilterService} from '../../houses/house-filter/house-filter.service';

describe('IceAndFireService', () => {
  let service: IceAndFireService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let houseFilterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.get(IceAndFireService);
    houseFilterService = TestBed.get(HouseFilterService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should handle initialDataLengthFetch', async(() => {
    service.fetchHouses(1, 1, true);
  }));
  it('should run #subscribeToChanges()', async(() => {
    service.subscribeToChanges();
    houseFilterService.filtersChanged.next(<HouseFilter>{name: 'peter'});
    expect(service.filter.name === 'peter').toBeTruthy();
  }));
  it('should run #subscribeToChanges() without filter changes', async(() => {
    service.subscribeToChanges();
    service.filter = <HouseFilter>{name: 'peter'};
    houseFilterService.filtersChanged.next(<HouseFilter>{name: 'peter'});
    expect(service.filter.name === 'peter').toBeTruthy();
  }));
  it('should add filters to request', async(() => {
    const requestUrl = service.generateRequestUrl(1, 1);
    service.filter = <HouseFilter>{name: 'peter'};
    service.addFiltersToRequest(requestUrl);
    const result = requestUrl.searchParams.get('name');
    expect(result === 'peter').toBeTruthy();
  }));
  it('should succeed jsonEqual if arrays with objects with same order of variables are passed', async(() => {
    const result = service.jsonEqual([{test: '1', toast: '2'}], [{test: '1', toast: '2'}]);
    expect(result).toBeTruthy();
  }));
  it('should succeed jsonEqual if order of variables in objects is the same', async(() => {
    const result = service.jsonEqual({test: '1', toast: '2'}, {test: '1', toast: '2'});
    expect(result).toBeTruthy();
  }));
  it('should fail jsonEqual if order of variables in objects is not the same', async(() => {
    const result = service.jsonEqual({test: '1', toast: '2'}, {toast: '2', test: '1'});
    expect(result).toBeFalsy();
  }));
});
