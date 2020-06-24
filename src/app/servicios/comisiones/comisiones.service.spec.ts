import { TestBed } from '@angular/core/testing';

import { ComisionesServicePhp } from './comisiones.service';

describe('ComisionesService', () => {
  let service: ComisionesServicePhp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComisionesServicePhp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
