import { TestBed } from '@angular/core/testing';

import { PhpServeConvocatoria } from './php-serve.service';

describe('PhpServeService', () => {
  let service: PhpServeConvocatoria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhpServeConvocatoria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
