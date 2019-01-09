import {NgModule} from '@angular/core';
import {HousesComponent} from './houses.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {RouterModule, Routes} from '@angular/router';

const housesRoutes: Routes = [{
  path: '', component: HousesComponent, children: [
    {path: ':houseIndex', component: HouseDetailComponent},
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(housesRoutes)
  ],
  exports: [RouterModule],
})
export class HousesRoutingModule {
}
