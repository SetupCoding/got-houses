import { TestBed } from '@angular/core/testing';

import { HouseFilterService } from './house-filter.service';

describe('HouseFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseFilterService = TestBed.get(HouseFilterService);
    expect(service).toBeTruthy();
  });
});
