import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogModalComponent } from './log-modal.component';

describe('LogModalComponent', () => {
  let component: LogModalComponent;
  let fixture: ComponentFixture<LogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
