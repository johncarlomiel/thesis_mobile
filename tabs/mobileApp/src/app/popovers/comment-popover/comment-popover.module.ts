import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentPopoverPage } from './comment-popover.page';
import { EditCommentPage } from 'src/app/modals/edit-comment/edit-comment.page';
import { EditCommentPageModule } from 'src/app/modals/edit-comment/edit-comment.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCommentPageModule
  ],
  declarations: [CommentPopoverPage],
  entryComponents: [EditCommentPage]
})
export class CommentPopoverPageModule { }
