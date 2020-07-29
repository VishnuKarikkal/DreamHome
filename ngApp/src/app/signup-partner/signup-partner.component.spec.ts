import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPartnerComponent } from './signup-partner.component';

describe('SignupPartnerComponent', () => {
  let component: SignupPartnerComponent;
  let fixture: ComponentFixture<SignupPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
