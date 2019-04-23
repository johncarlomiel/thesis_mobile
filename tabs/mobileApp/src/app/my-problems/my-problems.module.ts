import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyProblemsPage } from './my-problems.page';
import { MyProblemsModalPageModule } from '../modals/my-problems-modal/my-problems-modal.module';
import { MyProblemsModalPage } from '../modals/my-problems-modal/my-problems-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MyProblemsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProblemsModalPageModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [MyProblemsModalPage],
  declarations: [MyProblemsPage]
})
export class MyProblemsPageModule { }
