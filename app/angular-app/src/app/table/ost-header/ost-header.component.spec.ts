import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OstHeaderComponent } from './ost-header.component';

describe('OstHeaderComponent', () => {
  let component: OstHeaderComponent;
  let fixture: ComponentFixture<OstHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OstHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
