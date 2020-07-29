import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepartnerComponent } from './updatepartner.component';

describe('UpdatepartnerComponent', () => {
  let component: UpdatepartnerComponent;
  let fixture: ComponentFixture<UpdatepartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
