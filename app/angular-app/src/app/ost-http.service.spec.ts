import { TestBed, inject } from '@angular/core/testing';

import { OstHttp } from './ost-http.service';

describe('OstHttpServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OstHttp]
    });
  });

  it('should be created', inject([OstHttp], (service: OstHttp) => {
    expect(service).toBeTruthy();
  }));
});
