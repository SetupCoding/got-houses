import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {ProgressiveWebAppComponent} from '../progressive-web-app/progressive-web-app.component';
import {MatToolbarModule} from '@angular/material';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../../../environments/environment';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        ProgressiveWebAppComponent],
      imports: [
        MatToolbarModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
