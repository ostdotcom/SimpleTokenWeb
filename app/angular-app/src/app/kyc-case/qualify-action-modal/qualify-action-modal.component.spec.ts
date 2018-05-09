import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifyActionModalComponent } from './qualify-action-modal.component';

describe('QualifyActionModalComponent', () => {
  let component: QualifyActionModalComponent;
  let fixture: ComponentFixture<QualifyActionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualifyActionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifyActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
