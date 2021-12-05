import { TestBed } from '@angular/core/testing';

import { NgrxApiService } from './ngrx-api.service';

describe('NgrxApiService', () => {
  let service: NgrxApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
