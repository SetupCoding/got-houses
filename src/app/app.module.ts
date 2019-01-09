import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {iceAndFireApiUrl} from './core/http/ice-and-fire.service';
import {iceAndFireApiVersion, VersionInterceptor} from './core/interceptors/version.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    {provide: iceAndFireApiUrl, useValue: environment.iceAndFireApi.url},
    {provide: iceAndFireApiVersion, useValue: environment.iceAndFireApi.version},
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
