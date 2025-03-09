import { TestBed } from '@angular/core/testing';

import { EsculService } from './escul.service';

describe('EsculService', () => {
  let service: EsculService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsculService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
