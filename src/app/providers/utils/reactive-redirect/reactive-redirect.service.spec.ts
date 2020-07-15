import { TestBed, inject } from '@angular/core/testing';

import { ReactiveRedirectService } from './reactive-redirect.service';

describe('ReactiveRedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReactiveRedirectService]
    });
  });

  it('should be created', inject([ReactiveRedirectService], (service: ReactiveRedirectService) => {
    expect(service).toBeTruthy();
  }));
});
