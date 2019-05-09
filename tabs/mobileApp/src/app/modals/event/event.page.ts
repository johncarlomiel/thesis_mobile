import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { LikeService } from 'src/app/services/like/like.service';
import { Storage } from '@ionic/storage';
import * as date_fns from 'date-fns';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentPopoverPage } from 'src/app/popovers/comment-popover/comment-popover.page';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @Input("eventInfo") eventInfo;
  userData: any;
  constructor(
    private modalController: ModalController,
    private likeService: LikeService,
    private storage: Storage,
    private commentService: CommentService,
    private popoverController: PopoverController,
    private toastController: ToastController
  ) {





  }
  errorImage() {
    alert("error image")
  }
  ngOnInit() {
    this.storage.get("user_data").then((userData) => {
      this.userData = userData;
      console.log(this.userData)
    }).catch((error) => console.log(error));

    // this.likeService.newLike().subscribe((event) => {
    //   if (event.event_id == this.eventInfo.event_id) {
    //     this.eventInfo.likes_counter = event.likes_counter;
    //   }
    // });

    // this.commentService.receiveNewComment().subscribe((event_with_comment) => {
    //   if (this.eventInfo.event_id == event_with_comment.event.event_id) {
    //     this.eventInfo.comments_counter = event_with_comment.event.comments_counter;
    //     console.log(event_with_comment)
    //     this.eventInfo.comments.push(event_with_comment.comment);
    //     console.log(this.eventInfo)
    //   }
    // });
    console.log(this.eventInfo)
  }
  return() {

    this.modalController.dismiss();

  }
  trim(string: string) {
    return string.substring(0, 45);
  }
  durationLastOnline(date) {
    return date_fns.distanceInWordsToNow(date);
  }

  sendComment(event, comment) {
    this.commentService.sendComment(event.event_id, this.userData.id, comment);
  }

  async showPopover(comment, event) {
    const popover = await this.popoverController.create({
      component: CommentPopoverPage,
      componentProps: {
        commentInfo: comment,
        eventInfo: this.eventInfo
      },
      translucent: true,
      event
    });
    popover.onDidDismiss().then((val) => {
      this.presentToast(val.data.action);
    });
    return await popover.present();
  }



  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  like() {
    console.log(this.eventInfo);
    if (!this.eventInfo.isLike) {
      this.likeService.like(this.eventInfo.event_id, this.userData.id);
      this.eventInfo.icon = "heart";
      this.eventInfo.isLike = !this.eventInfo.isLike;
    } else {
      this.likeService.unlike(this.eventInfo.event_id, this.userData.index);
      this.eventInfo.icon = "heart-empty";
      this.eventInfo.isLike = !this.eventInfo.isLike;
    }

  }

}
