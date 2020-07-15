import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveRedirectComponent } from './reactive-redirect.component';

describe('ReactiveRedirectComponent', () => {
  let component: ReactiveRedirectComponent;
  let fixture: ComponentFixture<ReactiveRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
