import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMessageInputComponent } from './control-message-input.component';

describe('ControlMessageInputComponent', () => {
  let component: ControlMessageInputComponent;
  let fixture: ComponentFixture<ControlMessageInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlMessageInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
