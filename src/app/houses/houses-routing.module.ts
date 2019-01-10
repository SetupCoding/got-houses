import {NgModule} from '@angular/core';
import {HousesComponent} from './houses.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {HouseEmptyComponent} from './house-empty/house-empty.component';

const housesRoutes: Routes = [{
  path: '', component: HousesComponent, children: [
    {path: '', component: HouseEmptyComponent},
    {path: ':index', component: HouseDetailComponent},
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
