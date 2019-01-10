import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './loading.component';
import {MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    // MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule {
}
