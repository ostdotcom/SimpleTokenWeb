import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowDetailComponent } from './row-detail.component';

describe('RowDetailComponent', () => {
  let component: RowDetailComponent;
  let fixture: ComponentFixture<RowDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
