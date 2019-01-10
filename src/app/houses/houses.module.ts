import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseItemComponent} from './house-list/house-item/house-item.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {HousesRoutingModule} from './houses-routing.module';
import {HousesComponent} from './houses.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatPaginatorModule, MatProgressBarModule,
  MatRippleModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {HouseEmptyComponent} from './house-empty/house-empty.component';
import {LoadingModule} from '../core/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    HousesRoutingModule,
    LoadingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatRippleModule
  ],
  declarations: [
    HousesComponent,
    HouseListComponent,
    HouseItemComponent,
    HouseDetailComponent,
    HouseEmptyComponent]
})
export class HousesModule {
}
