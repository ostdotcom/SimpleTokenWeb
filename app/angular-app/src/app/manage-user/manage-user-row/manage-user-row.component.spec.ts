import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserRowComponent } from './manage-user-row.component';

describe('ManageUserRowComponent', () => {
  let component: ManageUserRowComponent;
  let fixture: ComponentFixture<ManageUserRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
