import {TestBed} from '@angular/core/testing';

import {SnackBarService} from './snack-bar.service';
import {MatSnackBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,
      MatSnackBarModule,
      BrowserAnimationsModule
    ]
  }));

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });
  it('should run #showSnackBar', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    service.showSnackBar();
  });
  it('should run #hideSnackBar', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    service.hideSnackBar();
  });
});
