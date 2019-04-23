import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyInfoPage } from './my-info.page';
import { MyInfoModalPage } from '../modals/my-info-modal/my-info-modal.page';
import { MyInfoModalPageModule } from '../modals/my-info-modal/my-info-modal.module';



const routes: Routes = [
  {
    path: '',
    component: MyInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyInfoModalPageModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [MyInfoModalPage],
  declarations: [MyInfoPage],
})
export class MyInfoPageModule { }
