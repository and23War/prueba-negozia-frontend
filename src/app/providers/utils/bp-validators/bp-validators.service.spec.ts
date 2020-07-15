import { TestBed, inject } from '@angular/core/testing';

import { BpValidatorsService } from './bp-validators.service';

describe('BpValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BpValidatorsService]
    });
  });

  it('should be created', inject([BpValidatorsService], (service: BpValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
