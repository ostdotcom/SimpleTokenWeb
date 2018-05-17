import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBaseComponentComponent } from './page-base-component.component';

describe('PageBaseComponentComponent', () => {
  let component: PageBaseComponentComponent;
  let fixture: ComponentFixture<PageBaseComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBaseComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBaseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
