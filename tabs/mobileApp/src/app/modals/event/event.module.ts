import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';
import { CommentPopoverPage } from 'src/app/popovers/comment-popover/comment-popover.page';
import { CommentPopoverPageModule } from 'src/app/popovers/comment-popover/comment-popover.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPopoverPageModule
  ],
  declarations: [EventPage],
  entryComponents: [CommentPopoverPage]
})
export class EventPageModule { }
