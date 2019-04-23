import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdsResultPage } from './sds-result.page';

describe('SdsResultPage', () => {
  let component: SdsResultPage;
  let fixture: ComponentFixture<SdsResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdsResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdsResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
