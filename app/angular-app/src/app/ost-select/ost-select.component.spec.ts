import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OstSelectComponent } from './ost-select.component';

describe('OstSelectComponent', () => {
  let component: OstSelectComponent;
  let fixture: ComponentFixture<OstSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OstSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
