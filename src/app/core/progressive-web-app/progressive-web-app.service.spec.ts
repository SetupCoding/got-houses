import { TestBed } from '@angular/core/testing';

import { ProgressiveWebAppService } from './progressive-web-app.service';

describe('PwaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressiveWebAppService = TestBed.get(ProgressiveWebAppService);
    expect(service).toBeTruthy();
  });
});
