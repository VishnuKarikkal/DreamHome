import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercontrolComponent } from './usercontrol.component';

describe('UsercontrolComponent', () => {
  let component: UsercontrolComponent;
  let fixture: ComponentFixture<UsercontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
