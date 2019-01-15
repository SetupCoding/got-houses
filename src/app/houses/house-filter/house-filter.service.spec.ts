import {HouseFilterService} from './house-filter.service';
import {TestBed} from '@angular/core/testing';
import {HouseFilter} from '../../models/house-filter';
import {MatSelect} from '@angular/material';

describe('HouseFilterService', () => {
  let service: HouseFilterService;
  const mockHouseFilter = <HouseFilter>{
    name: '',
    region: '',
    words: '',
    hasWords: false,
    hasTitles: false,
    hasSeats: false,
    hasDiedOut: false,
    hasAncestralWeapons: false
  };
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(HouseFilterService);
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    service = new HouseFilterService();
  });

  it('should run #addFilter()', async () => {
    service.addFilter(<MatSelect>{value: {name: 'name'}}, 'peter', false);
  });
  it('should run #addFilter() with empty filter type', async () => {
    service.addFilter(<MatSelect>{value: {name: undefined}}, 'peter', false);
  });

  it('should run #removeFilter()', async () => {
    service.removeFilter('name');
  });

  it('should run #removeAllFilters()', async () => {
    service.removeAllFilters();
    expect(service.isEmptyObject(service.selectedFilter)).toBeTruthy();
  });

  it('should run #isEmptyObject()', async () => {
    const result = service.isEmptyObject(<HouseFilter>{});
    expect(result).toBeTruthy();
  });
  it('should fail #isEmptyObject() on not empty object', async () => {
    const result = service.isEmptyObject(<HouseFilter>mockHouseFilter);
    expect(result).toBeFalsy();
  });
});

