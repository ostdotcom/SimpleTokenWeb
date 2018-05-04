import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStateHandlerComponent } from './request-state-handler.component';

describe('RequestStateHandlerComponent', () => {
  let component: RequestStateHandlerComponent;
  let fixture: ComponentFixture<RequestStateHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestStateHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStateHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
