import { TestBed } from '@angular/core/testing';

import { PhpServeLabo } from './php-serve-labo.service';

describe('PhpServeLaboService', () => {
  let service: PhpServeLabo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhpServeLabo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
