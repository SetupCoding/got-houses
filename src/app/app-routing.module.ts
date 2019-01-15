import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';


const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'houses', loadChildren: './houses/houses.module#HousesModule'},
  {path: '**', redirectTo: '/houses'},


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
