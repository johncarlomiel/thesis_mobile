import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { EditCommentPage } from 'src/app/modals/edit-comment/edit-comment.page';

@Component({
  selector: 'app-comment-popover',
  templateUrl: './comment-popover.page.html',
  styleUrls: ['./comment-popover.page.scss'],
})
export class CommentPopoverPage implements OnInit {
  @Input('commentInfo') commentInfo: any;
  @Input('eventInfo') eventInfo: any;
  constructor(
    private commentService: CommentService,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.commentInfo)
  }

  delete() {
    this.commentService.deleteComment(this.commentInfo.comment_id, this.eventInfo.event_id);
    this.popoverController.dismiss({
      action: "Comment Deleted Successfully."
    });
  }

  async update() {
    const modal = await this.modalController.create({
      component: EditCommentPage,
      componentProps: { commentInfo: this.commentInfo, eventInfo: this.eventInfo }
    });
    modal.onWillDismiss().then(() => {
      this.popoverController.dismiss({
        action: "Comment Updated Successfully."
      });
    });
    return await modal.present();
  }

}
