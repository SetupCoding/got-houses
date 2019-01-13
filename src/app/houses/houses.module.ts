import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {HousesRoutingModule} from './houses-routing.module';
import {HousesComponent} from './houses.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressBarModule,
  MatRippleModule, MatSelectModule, MatSnackBarModule,
  MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {HouseEmptyComponent} from './house-empty/house-empty.component';
import {LoadingModule} from '../core/loading/loading.module';
import {HouseFilterComponent} from './house-filter/house-filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HouseFilterItemComponent} from './house-filter/house-filter-item/house-filter-item.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

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
    MatListModule,
    MatChipsModule
  ],
  declarations: [
    HousesComponent,
    HouseListComponent,
    HouseDetailComponent,
    HouseEmptyComponent,
    HouseFilterComponent,
    HouseFilterItemComponent,
    CharacterDetailComponent]
})
export class HousesModule {
}
