import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDetailsRowComponent } from './kyc-details-row.component';

describe('KycDetailsRowComponent', () => {
  let component: KycDetailsRowComponent;
  let fixture: ComponentFixture<KycDetailsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycDetailsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDetailsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
