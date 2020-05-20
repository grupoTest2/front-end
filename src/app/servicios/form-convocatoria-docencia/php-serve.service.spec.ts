import { TestBed } from '@angular/core/testing';

import { PhpServeService } from './php-serve.service';

describe('PhpServeService', () => {
  let service: PhpServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhpServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
