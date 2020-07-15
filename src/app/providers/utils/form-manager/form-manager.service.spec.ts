import { TestBed, inject } from '@angular/core/testing';

import { FormManagerService } from './form-manager.service';

describe('FormManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormManagerService]
    });
  });

  it('should be created', inject([FormManagerService], (service: FormManagerService) => {
    expect(service).toBeTruthy();
  }));
});
