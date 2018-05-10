import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycLogRowComponent } from './kyc-log-row.component';

describe('KycLogRowComponent', () => {
  let component: KycLogRowComponent;
  let fixture: ComponentFixture<KycLogRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycLogRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycLogRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
