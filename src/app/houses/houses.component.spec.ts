import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousesComponent} from './houses.component';
import {
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {HouseListComponent} from './house-list/house-list.component';
import {RouterModule, Routes} from '@angular/router';
import {HouseFilterComponent} from './house-filter/house-filter.component';
import {LoadingModule} from '../core/loading/loading.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HouseFilterItemComponent} from './house-filter/house-filter-item/house-filter-item.component';
import {HttpClientModule} from '@angular/common/http';
import {HouseEmptyComponent} from './house-empty/house-empty.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {CharacterDetailComponent} from './character-detail/character-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('HousesComponent', () => {
  let component: HousesComponent;
  let fixture: ComponentFixture<HousesComponent>;
  const housesRoutes: Routes = [{
    path: '', component: HousesComponent, children: [
      {path: '', component: HouseEmptyComponent},
      {path: ':index', component: HouseDetailComponent},
    ]
  }];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        LoadingModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(housesRoutes),
        BrowserAnimationsModule,
        MatGridListModule,
        MatPaginatorModule,
        MatIconModule,
        MatExpansionModule,
        MatTableModule,
        MatSelectModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        MatSnackBarModule,
        MatCardModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,

      ],
      declarations: [
        HousesComponent,
        HouseListComponent,
        HouseFilterComponent,
        HouseFilterItemComponent,
        HouseEmptyComponent,
        HouseDetailComponent,
        CharacterDetailComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
