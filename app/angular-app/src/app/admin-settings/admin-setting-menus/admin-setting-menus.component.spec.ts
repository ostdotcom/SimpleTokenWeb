import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettingMenusComponent } from './admin-setting-menus.component';

describe('AdminSettingMenusComponent', () => {
  let component: AdminSettingMenusComponent;
  let fixture: ComponentFixture<AdminSettingMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSettingMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettingMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
