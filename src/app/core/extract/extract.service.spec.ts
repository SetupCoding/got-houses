import {TestBed} from '@angular/core/testing';

import {ExtractService} from './extract.service';

describe('ExtractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtractService = TestBed.get(ExtractService);
    expect(service).toBeTruthy();
  });
  it('should extract 123 from https://anapioficeandfire.com/api/houses/123', () => {
    const service: ExtractService = TestBed.get(ExtractService);
    expect(service.extractIndexFromUrl('https://anapioficeandfire.com/api/houses/229')).toBeTruthy();
  });
});
