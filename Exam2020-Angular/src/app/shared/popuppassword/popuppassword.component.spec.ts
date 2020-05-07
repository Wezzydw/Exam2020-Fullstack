import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuppasswordComponent } from './popuppassword.component';

describe('PopuppasswordComponent', () => {
  let component: PopuppasswordComponent;
  let fixture: ComponentFixture<PopuppasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopuppasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopuppasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
