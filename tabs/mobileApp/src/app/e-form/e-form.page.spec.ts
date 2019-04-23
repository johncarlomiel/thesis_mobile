import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EFormPage } from './e-form.page';

describe('EFormPage', () => {
  let component: EFormPage;
  let fixture: ComponentFixture<EFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
