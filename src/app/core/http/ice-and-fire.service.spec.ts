import {TestBed} from '@angular/core/testing';

import {IceAndFireService} from './ice-and-fire.service';
import {HttpClientModule} from '@angular/common/http';

describe('IceAndFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule]}));

  it('should be created', () => {
    const service: IceAndFireService = TestBed.get(IceAndFireService);
    expect(service).toBeTruthy();
  });
});
