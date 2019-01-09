import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {iceAndFireApiUrl} from './core/http/ice-and-fire.service';
import {iceAndFireApiVersion, VersionInterceptor} from './core/interceptors/version.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide: iceAndFireApiUrl, useValue: environment.iceAndFireApi.url},
    {provide: iceAndFireApiVersion, useValue: environment.iceAndFireApi.version},
    {provide: HTTP_INTERCEPTORS, useClass: VersionInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
