import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInfoPage } from './my-info.page';

describe('MyInfoPage', () => {
  let component: MyInfoPage;
  let fixture: ComponentFixture<MyInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
