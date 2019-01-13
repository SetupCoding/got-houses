import { TestBed } from '@angular/core/testing';

import { HouseStoreService } from './house-store.service';

describe('HouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseStoreService = TestBed.get(HouseStoreService);
    expect(service).toBeTruthy();
  });
});
