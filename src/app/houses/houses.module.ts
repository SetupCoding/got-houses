import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseItemComponent} from './house-list/house-item/house-item.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {HousesRoutingModule} from './houses-routing.module';
import {HousesComponent} from './houses.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule, MatInputModule,
  MatPaginatorModule, MatProgressBarModule,
  MatRippleModule, MatSelectModule,
  MatTableModule,
  MatToolbarModule, MatTooltipModule
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
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatRippleModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule
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
