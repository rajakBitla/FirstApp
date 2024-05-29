import { TestBed } from '@angular/core/testing';

import { TrackingGoService } from './tracking-go.service';

describe('TrackingGoService', () => {
  let service: TrackingGoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingGoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
