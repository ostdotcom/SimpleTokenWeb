import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendInviteModalComponent } from './resend-invite-modal.component';

describe('ResendInviteModalComponent', () => {
  let component: ResendInviteModalComponent;
  let fixture: ComponentFixture<ResendInviteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendInviteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendInviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
