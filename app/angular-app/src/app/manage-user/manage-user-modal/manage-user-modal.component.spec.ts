import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserModalComponent } from './manage-user-modal.component';

describe('ManageUserModalComponent', () => {
  let component: ManageUserModalComponent;
  let fixture: ComponentFixture<ManageUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
