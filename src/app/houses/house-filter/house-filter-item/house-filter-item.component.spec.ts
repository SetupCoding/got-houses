import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseFilterItemComponent } from './house-filter-item.component';

describe('HouseFilterItemComponent', () => {
  let component: HouseFilterItemComponent;
  let fixture: ComponentFixture<HouseFilterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseFilterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseFilterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
