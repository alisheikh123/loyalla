import { TestBed } from '@angular/core/testing';

import { CaseuploadService } from './caseupload.service';

describe('CaseuploadService', () => {
  let service: CaseuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
