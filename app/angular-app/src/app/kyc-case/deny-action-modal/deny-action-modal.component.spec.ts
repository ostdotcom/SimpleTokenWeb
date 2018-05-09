import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyActionModalComponent } from './deny-action-modal.component';

describe('DenyActionModalComponent', () => {
  let component: DenyActionModalComponent;
  let fixture: ComponentFixture<DenyActionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenyActionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
