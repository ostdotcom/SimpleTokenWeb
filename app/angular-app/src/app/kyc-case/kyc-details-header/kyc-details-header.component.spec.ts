import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDetailsHeaderComponent } from './kyc-details-header.component';

describe('KycDetailsHeaderComponent', () => {
  let component: KycDetailsHeaderComponent;
  let fixture: ComponentFixture<KycDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
