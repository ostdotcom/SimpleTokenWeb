import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OstRowComponent } from './ost-row.component';

describe('OstRowComponent', () => {
  let component: OstRowComponent;
  let fixture: ComponentFixture<OstRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OstRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
