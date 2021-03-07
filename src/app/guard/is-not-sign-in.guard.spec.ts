import { TestBed } from '@angular/core/testing';

import { IsNotSignInGuard } from './is-not-sign-in.guard';

describe('IsNotSignInGuard', () => {
  let guard: IsNotSignInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotSignInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
