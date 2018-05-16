import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycCaseComponent } from './kyc-case.component';

describe('KycCaseComponent', () => {
  let component: KycCaseComponent;
  let fixture: ComponentFixture<KycCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
