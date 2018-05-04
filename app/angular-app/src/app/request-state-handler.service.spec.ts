import { TestBed, inject } from '@angular/core/testing';

import { RequestStateHandlerService } from './request-state-handler.service';

describe('RequestStateHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestStateHandlerService]
    });
  });

  it('should be created', inject([RequestStateHandlerService], (service: RequestStateHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
