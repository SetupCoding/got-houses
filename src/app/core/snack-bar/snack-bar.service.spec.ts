import {TestBed} from '@angular/core/testing';

import {SnackBarService} from './snack-bar.service';
import {MatSnackBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('SnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,
      MatSnackBarModule
    ]
  }));

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });
});
