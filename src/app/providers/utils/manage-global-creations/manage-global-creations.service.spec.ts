import { TestBed, inject } from '@angular/core/testing';

import { ManageGlobalCreationsService } from './manage-global-creations.service';

describe('ManageGlobalCreationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageGlobalCreationsService]
    });
  });

  it('should be created', inject([ManageGlobalCreationsService], (service: ManageGlobalCreationsService) => {
    expect(service).toBeTruthy();
  }));
});
