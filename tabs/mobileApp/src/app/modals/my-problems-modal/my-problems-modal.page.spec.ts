import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProblemsModalPage } from './my-problems-modal.page';

describe('MyProblemsModalPage', () => {
  let component: MyProblemsModalPage;
  let fixture: ComponentFixture<MyProblemsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProblemsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProblemsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
