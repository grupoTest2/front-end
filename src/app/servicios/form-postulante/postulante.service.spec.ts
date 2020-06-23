import { TestBed } from '@angular/core/testing';

import { PostulanteServicePhp } from './postulante.service';

describe('PostulanteService', () => {
  let service: PostulanteServicePhp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostulanteServicePhp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
