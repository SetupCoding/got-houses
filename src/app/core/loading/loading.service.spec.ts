import {async, TestBed} from '@angular/core/testing';
import {LoadingService} from './loading.service';

describe('LoadingService', () => {
  let service;


  beforeEach(() => {
    service = new LoadingService();
  });

  it('should be created', () => {
    service = TestBed.get(LoadingService);
    expect(service).toBeTruthy();
  });

  it('should run #show()', async () => {
    service.show();
  });

  it('should run #hide()', async () => {
    service.hide();
  });

});
