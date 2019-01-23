import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressiveWebAppComponent} from './progressive-web-app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../../../environments/environment';
import {ProgressiveWebAppService} from './progressive-web-app.service';

describe('ProgressiveWebAppComponent', () => {
  let component: ProgressiveWebAppComponent;
  let fixture: ComponentFixture<ProgressiveWebAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressiveWebAppComponent],
      imports: [ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressiveWebAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #installPWA', () => {
    const pwaService = fixture.debugElement.injector.get(ProgressiveWebAppService);
    window.dispatchEvent(new Event('beforeinstallprompt'));
    pwaService.installPromptEvent.prompt = () => {
    };
    component.installPwa();

  });
});
