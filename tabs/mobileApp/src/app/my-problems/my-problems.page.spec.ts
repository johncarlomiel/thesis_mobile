import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProblemsPage } from './my-problems.page';

describe('MyProblemsPage', () => {
  let component: MyProblemsPage;
  let fixture: ComponentFixture<MyProblemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProblemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProblemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
