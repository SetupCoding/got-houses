import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseItemComponent} from './house-list/house-item/house-item.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {HousesRoutingModule} from './houses-routing.module';
import {HousesComponent} from './houses.component';
import {MatCardModule, MatFormFieldModule, MatGridListModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import { HouseEmptyComponent } from './house-empty/house-empty.component';

@NgModule({
  imports: [
    CommonModule,
    HousesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
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
