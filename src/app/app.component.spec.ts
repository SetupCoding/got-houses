import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {ProgressiveWebAppComponent} from './core/progressive-web-app/progressive-web-app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ProgressiveWebAppComponent,
        HeaderComponent,
      ],
      imports: [
        AppRoutingModule,
        BrowserModule,
        MatToolbarModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
