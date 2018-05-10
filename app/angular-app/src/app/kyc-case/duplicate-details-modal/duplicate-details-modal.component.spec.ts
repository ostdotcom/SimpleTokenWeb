import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateDetailsModalComponent } from './duplicate-details-modal.component';

describe('DuplicateDetailsModalComponent', () => {
  let component: DuplicateDetailsModalComponent;
  let fixture: ComponentFixture<DuplicateDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
