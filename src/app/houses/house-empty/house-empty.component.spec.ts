import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseEmptyComponent } from './house-empty.component';

describe('HouseEmptyComponent', () => {
  let component: HouseEmptyComponent;
  let fixture: ComponentFixture<HouseEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
