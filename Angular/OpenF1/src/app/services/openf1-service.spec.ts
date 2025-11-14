import { TestBed } from '@angular/core/testing';

import { Openf1Service } from './openf1-service';

describe('Openf1Service', () => {
  let service: Openf1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Openf1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
