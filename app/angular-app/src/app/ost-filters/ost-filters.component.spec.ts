import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OstFiltersComponent } from './ost-filters.component';

describe('OstFiltersComponent', () => {
  let component: OstFiltersComponent;
  let fixture: ComponentFixture<OstFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OstFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
