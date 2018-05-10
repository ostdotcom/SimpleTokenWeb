import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycHeaderComponent } from './kyc-header.component';

describe('KycHeaderComponent', () => {
  let component: KycHeaderComponent;
  let fixture: ComponentFixture<KycHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
