import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycCaseActionModalComponent } from './kyc-case-action-modal.component';

describe('KycCaseActionModalComponent', () => {
  let component: KycCaseActionModalComponent;
  let fixture: ComponentFixture<KycCaseActionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycCaseActionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycCaseActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
