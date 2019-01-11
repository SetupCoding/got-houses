import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {HousesRoutingModule} from './houses-routing.module';
import {HousesComponent} from './houses.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressBarModule,
  MatRippleModule, MatSelectModule,
  MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {HouseEmptyComponent} from './house-empty/house-empty.component';
import {LoadingModule} from '../core/loading/loading.module';
import { HouseFilterComponent } from './house-filter/house-filter.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    MatCheckboxModule,
    MatListModule
  ],
  declarations: [
    HousesComponent,
    HouseListComponent,
    HouseDetailComponent,
    HouseEmptyComponent,
    HouseFilterComponent]
})
export class HousesModule {
}
