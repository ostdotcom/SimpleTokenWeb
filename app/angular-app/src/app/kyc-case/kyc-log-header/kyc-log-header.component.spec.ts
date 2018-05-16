import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycLogHeaderComponent } from './kyc-log-header.component';

describe('KycLogHeaderComponent', () => {
  let component: KycLogHeaderComponent;
  let fixture: ComponentFixture<KycLogHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycLogHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycLogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
