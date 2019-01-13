import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseDetailComponent} from './house-detail.component';
import {MatCardModule, MatExpansionModule, MatIconModule, MatListModule, MatTooltipModule} from '@angular/material';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CharacterDetailComponent} from '../character-detail/character-detail.component';
import {HttpClientModule} from '@angular/common/http';

describe('HouseDetailComponent', () => {
  let component: HouseDetailComponent;
  let fixture: ComponentFixture<HouseDetailComponent>;
  const appRoutes: Routes = [
    // {path: '', component: HomeComponent},
    {path: 'houses', loadChildren: './houses/houses.module#HousesModule'},
    {path: '**', redirectTo: '/houses'}

  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HouseDetailComponent, CharacterDetailComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatTooltipModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
