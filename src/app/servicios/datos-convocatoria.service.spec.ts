import { TestBed } from '@angular/core/testing';

import { DatosConvocatoriaService } from './datos-convocatoria.service';

describe('DatosConvocatoriaService', () => {
  let service: DatosConvocatoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosConvocatoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
