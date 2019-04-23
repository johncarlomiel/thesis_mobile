import { TestBed } from '@angular/core/testing';

import { UserProgressService } from './user-progress.service';

describe('UserProgressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProgressService = TestBed.get(UserProgressService);
    expect(service).toBeTruthy();
  });
});
