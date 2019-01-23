import {TestBed} from '@angular/core/testing';
import {ProgressiveWebAppService} from './progressive-web-app.service';
import {ServiceWorkerModule, SwUpdate} from '@angular/service-worker';


describe('ProgressiveWebAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false})
      ],
      providers: [
        SwUpdate
      ]
    });
  });

  it('should be created', () => {
    const service: ProgressiveWebAppService = TestBed.get(ProgressiveWebAppService);
    expect(service).toBeTruthy();
  });
  it('should react to beforeinstallprompt event', () => {
    const service: ProgressiveWebAppService = TestBed.get(ProgressiveWebAppService);

    window.dispatchEvent(new Event('beforeinstallprompt'));
    expect(service.installPromptEvent).toBeTruthy();
  });
  it('should delete installPrompt', () => {
    const service: ProgressiveWebAppService = TestBed.get(ProgressiveWebAppService);
    service.deletePromptEvent();
    expect(service.installPromptEvent).toBeFalsy();
  });
});
