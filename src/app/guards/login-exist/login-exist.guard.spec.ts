import { TestBed, async, inject } from '@angular/core/testing';

import { LoginExistGuard } from './login-exist.guard';

describe('LoginExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginExistGuard]
    });
  });

  it('should ...', inject([LoginExistGuard], (guard: LoginExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
