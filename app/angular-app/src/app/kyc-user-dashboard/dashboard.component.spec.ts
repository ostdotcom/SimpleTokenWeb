import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUserDashboardComponent } from './dashboard.component';

describe('KycUserDashboardComponent', () => {
  let component: KycUserDashboardComponent;
  let fixture: ComponentFixture<KycUserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycUserDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
