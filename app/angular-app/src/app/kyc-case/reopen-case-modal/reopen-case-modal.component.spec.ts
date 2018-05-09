import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenCaseModalComponent } from './reopen-case-modal.component';

describe('ReopenCaseModalComponent', () => {
  let component: ReopenCaseModalComponent;
  let fixture: ComponentFixture<ReopenCaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReopenCaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReopenCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
