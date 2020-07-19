import { TestBed } from '@angular/core/testing';

import { HabilitacionService } from './habilitacion.service';

describe('HabilitacionService', () => {
  let service: HabilitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
