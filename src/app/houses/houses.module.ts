import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseItemComponent} from './house-list/house-item/house-item.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {HousesRoutingModule} from './houses-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HousesRoutingModule
  ],
  declarations: [
    HouseListComponent,
    HouseItemComponent,
    HouseDetailComponent]
})
export class HousesModule {
}
