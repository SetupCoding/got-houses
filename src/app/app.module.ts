import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderInterceptor} from './core/interceptors/header.interceptor';
import {LoadingInterceptor} from './core/interceptors/loading.interceptor';
import {LoadingModule} from './core/loading/loading.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProgressiveWebAppComponent } from './core/progressive-web-app/progressive-web-app.component';
import { HeaderComponent } from './core/header/header.component';
import {MatButtonModule, MatToolbarModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ProgressiveWebAppComponent,
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
