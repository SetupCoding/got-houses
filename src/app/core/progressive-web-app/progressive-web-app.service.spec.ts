import {TestBed} from '@angular/core/testing';

import {ProgressiveWebAppService} from './progressive-web-app.service';
import {environment} from '../../../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';

describe('ProgressiveWebAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})]}));

  it('should be created', () => {
    const service: ProgressiveWebAppService = TestBed.get(ProgressiveWebAppService);
    expect(service).toBeTruthy();
  });
});
