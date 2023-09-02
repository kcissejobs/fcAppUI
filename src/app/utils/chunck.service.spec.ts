import { TestBed } from '@angular/core/testing';

import { ChunckService } from './chunck.service';

describe('ChunckService', () => {
  let service: ChunckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChunckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
