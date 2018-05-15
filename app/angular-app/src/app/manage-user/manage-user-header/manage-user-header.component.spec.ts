import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserHeaderComponent } from './manage-user-header.component';

describe('ManageUserHeaderComponent', () => {
  let component: ManageUserHeaderComponent;
  let fixture: ComponentFixture<ManageUserHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
