import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashBoardHeaderComponent } from './user-dash-board-header.component';

describe('UserDashBoardHeaderComponent', () => {
  let component: UserDashBoardHeaderComponent;
  let fixture: ComponentFixture<UserDashBoardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashBoardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashBoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
