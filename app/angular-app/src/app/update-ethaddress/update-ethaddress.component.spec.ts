import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEthaddressComponent } from './update-ethaddress.component';

describe('UpdateEthaddressComponent', () => {
  let component: UpdateEthaddressComponent;
  let fixture: ComponentFixture<UpdateEthaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEthaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEthaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
