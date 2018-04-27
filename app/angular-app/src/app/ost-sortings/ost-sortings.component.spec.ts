import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OstSortingsComponent } from './ost-sortings.component';

describe('OstSortingsComponent', () => {
  let component: OstSortingsComponent;
  let fixture: ComponentFixture<OstSortingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstSortingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OstSortingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
