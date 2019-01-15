import { TestBed } from '@angular/core/testing';

import { CharacterStoreService } from './character-store.service';

describe('CharacterStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterStoreService = TestBed.get(CharacterStoreService);
    expect(service).toBeTruthy();
  });
  it('should run #setDetailedCharacter() without character', () => {
    const service: CharacterStoreService = TestBed.get(CharacterStoreService);
    expect(service).toBeTruthy();
    service.setDetailedCharacter(null);
  });
});
