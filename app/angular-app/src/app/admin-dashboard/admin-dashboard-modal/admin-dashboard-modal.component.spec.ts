import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardModalComponent } from './admin-dashboard-modal.component';

describe('AdminDashboardModalComponent', () => {
  let component: AdminDashboardModalComponent;
  let fixture: ComponentFixture<AdminDashboardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
