import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OstOptionsComponent } from './ost-options.component';

describe('OstOptionsComponent', () => {
  let component: OstOptionsComponent;
  let fixture: ComponentFixture<OstOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OstOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
