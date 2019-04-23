import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AboutMePage } from './about-me.page';
import { AboutMeModalPageModule } from '../modals/about-me-modal/about-me-modal.module';
import { AboutMeModalPage } from '../modals/about-me-modal/about-me-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AboutMePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutMeModalPageModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [AboutMeModalPage],
  declarations: [AboutMePage]
})
export class AboutMePageModule { }
