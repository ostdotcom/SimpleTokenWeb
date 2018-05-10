import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OstAlertComponent } from './ost-alert.component';

describe('OstAlertComponent', () => {
  let component: OstAlertComponent;
  let fixture: ComponentFixture<OstAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OstAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
