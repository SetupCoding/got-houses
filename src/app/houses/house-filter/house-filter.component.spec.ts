import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseFilterComponent} from './house-filter.component';
import {
  MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HouseFilterItemComponent} from './house-filter-item/house-filter-item.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('HouseFilterComponent', () => {
  let component: HouseFilterComponent;
  let fixture: ComponentFixture<HouseFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [HouseFilterComponent, HouseFilterItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
