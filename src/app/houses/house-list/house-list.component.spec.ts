import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseListComponent} from './house-list.component';
import {
  MatCheckboxModule, MatChipsModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule, MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import {LoadingModule} from '../../core/loading/loading.module';
import {HouseFilterComponent} from '../house-filter/house-filter.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HouseFilterItemComponent} from '../house-filter/house-filter-item/house-filter-item.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('HouseListComponent', () => {
  let component: HouseListComponent;
  let fixture: ComponentFixture<HouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoadingModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatIconModule,
        MatExpansionModule,
        MatTableModule,
        MatSelectModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,

      ],
      declarations: [
        HouseListComponent,
        HouseFilterComponent,
        HouseFilterItemComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
