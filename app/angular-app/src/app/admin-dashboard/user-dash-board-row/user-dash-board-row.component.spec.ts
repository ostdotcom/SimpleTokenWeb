import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashBoardRowComponent } from './user-dash-board-row.component';

describe('UserDashBoardRowComponent', () => {
  let component: UserDashBoardRowComponent;
  let fixture: ComponentFixture<UserDashBoardRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashBoardRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashBoardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
