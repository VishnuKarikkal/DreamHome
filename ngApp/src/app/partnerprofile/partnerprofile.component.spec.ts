import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerprofileComponent } from './partnerprofile.component';

describe('PartnerprofileComponent', () => {
  let component: PartnerprofileComponent;
  let fixture: ComponentFixture<PartnerprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
