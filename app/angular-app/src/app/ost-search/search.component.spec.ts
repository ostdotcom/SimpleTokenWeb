import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycSearchComponent } from './kyc-search.component';

describe('KycSearchComponent', () => {
  let component: KycSearchComponent;
  let fixture: ComponentFixture<KycSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
