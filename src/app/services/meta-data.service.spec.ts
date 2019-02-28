import { TestBed } from '@angular/core/testing';

import { MetaDataService } from './meta-data.service';

describe('MetaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetaDataService = TestBed.get(MetaDataService);
    expect(service).toBeTruthy();
  });
});
