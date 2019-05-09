import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentPage } from './edit-comment.page';

describe('EditCommentPage', () => {
  let component: EditCommentPage;
  let fixture: ComponentFixture<EditCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
