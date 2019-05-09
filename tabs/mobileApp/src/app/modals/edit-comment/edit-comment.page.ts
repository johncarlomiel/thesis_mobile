import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.page.html',
  styleUrls: ['./edit-comment.page.scss'],
})
export class EditCommentPage implements OnInit {
  @Input("commentInfo") commentInfo: { any };
  @Input("eventInfo") eventInfo;
  constructor(
    private modalController: ModalController,
    private commentService: CommentService

  ) { }

  ngOnInit() {
    console.log(this.commentInfo)
    console.log(this.eventInfo)
  }

  submitEdit(newComment) {
    console.log(newComment)
    this.commentService.editComment(this.commentInfo, this.eventInfo.event_id, newComment);
    this.modalController.dismiss();
  }

  return() {
    this.modalController.dismiss();
  }

}
