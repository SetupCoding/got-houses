import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {IceAndFireService} from './ice-and-fire.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('IceAndFireService', () => {
  let service: IceAndFireService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.get(IceAndFireService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    service = TestBed.get(IceAndFireService);
    expect(service).toBeTruthy();
  });
  it('should handle initialDataLengthFetch', async(() => {
    service = TestBed.get(IceAndFireService);
    service.fetchHouses(1, 1, true);
  }));
  it('should handle error', async(() => {
    service = TestBed.get(IceAndFireService);
    service.fetchHouses();
    expect(console.error).toBeTruthy();
  }));
});
