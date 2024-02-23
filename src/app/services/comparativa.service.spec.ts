import { TestBed } from '@angular/core/testing';

import { ComparativaService } from './comparativa.service';

describe('ComparativaService', () => {
  let service: ComparativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
