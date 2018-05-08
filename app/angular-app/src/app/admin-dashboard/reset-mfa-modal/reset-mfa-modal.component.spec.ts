import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetMfaModalComponent } from './reset-mfa-modal.component';

describe('ResetMfaModalComponent', () => {
  let component: ResetMfaModalComponent;
  let fixture: ComponentFixture<ResetMfaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetMfaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetMfaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
