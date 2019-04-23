import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeModalPage } from './about-me-modal.page';

describe('AboutMeModalPage', () => {
  let component: AboutMeModalPage;
  let fixture: ComponentFixture<AboutMeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
