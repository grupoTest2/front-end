import { TestBed } from '@angular/core/testing';

import { EditarConvocatoriaServicePhp } from './editar-convocatoria.service';

describe('EditarConvocatoriaService', () => {
  let service: EditarConvocatoriaServicePhp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarConvocatoriaServicePhp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
