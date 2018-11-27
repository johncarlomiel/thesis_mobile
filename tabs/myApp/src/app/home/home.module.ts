import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { InfoPage } from '../modals/info/info.page';
import { InfoPageModule } from '../modals/info/info.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InfoPageModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  entryComponents:[InfoPage],
  declarations: [HomePage]
})
export class HomePageModule {}
