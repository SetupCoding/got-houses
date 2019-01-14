import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingComponent} from './loading.component';
import {MatProgressBarModule} from '@angular/material';
import {of} from 'rxjs';
import {LoadingService} from './loading.service';
import {LoadingState} from './loading';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent], imports: [MatProgressBarModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    const loadingService = fixture.debugElement.injector.get(LoadingService);
    component.ngOnInit();
    loadingService.loadingSubject.next(<LoadingState>{show: false});

  });
  it('should subscribe to changes', () => {
    const loadingService = fixture.debugElement.injector.get(LoadingService);
    component.ngOnInit();
    expect(component.isLoading).toBeFalsy();
    loadingService.loadingSubject.next(<LoadingState>{show: true});
    expect(component.isLoading).toBeTruthy();

  });
});
