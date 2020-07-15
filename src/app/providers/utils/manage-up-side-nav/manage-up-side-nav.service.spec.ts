import { TestBed, inject } from '@angular/core/testing';

import { ManageUpSideNavService } from './manage-up-side-nav.service';

describe('ManageUpSideNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageUpSideNavService]
    });
  });

  it('should be created', inject([ManageUpSideNavService], (service: ManageUpSideNavService) => {
    expect(service).toBeTruthy();
  }));
});
