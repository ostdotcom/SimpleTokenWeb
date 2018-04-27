import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OstPaginationComponent } from './pagination.component';

describe('OstPaginationComponent', () => {
  let component: OstPaginationComponent;
  let fixture: ComponentFixture<OstPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OstPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
