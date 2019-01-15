import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './loading.component';
import {MatProgressBarModule} from '@angular/material';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  providers: [],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule {
}
