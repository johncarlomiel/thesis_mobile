import { Component } from '@angular/core';
import io from 'socket.io-client';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';
import { MenuController } from '@ionic/angular';
import * as date_fns from 'date-fns';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LikeService } from '../services/like/like.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notif: any;
  events: any;
  userData: any;
  page = "incoming";
  pastEvents = Array.apply(null, Array())
  incomingEvents = Array.apply(null, Array())

  constructor(
    private storage: Storage,
    private userService: UserService,
    private menuController: MenuController,
    private photoViewer: PhotoViewer,
    private likeService: LikeService
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.notif)
    this.getEvents();

    this.storage.get("user_data").then((userData) => {
      this.userData = userData;
      console.log(this.userData)
    }).catch((error) => console.log(error));


    //Check for new like update
    this.likeService.newLike().subscribe((event) => {
      console.log(event)
      this.events.forEach((element, index) => {
        if (this.events[index].event_id == event.event_id) {


          // console.log(this.events[index])
          // this.events[index].user_id = event.user_id;
          this.events[index].likes_counter = event.likes_counter;
          // this.events[index].icon = "heart";
          // console.log(this.events[index].user_id)
          // if (this.events[index].user_id == null) {
          //   this.events[index].icon = "heart-empty";
          // } else {
          //   this.events[index].icon = "heart";

          // }






        }
      });
    });


  }
  like(i) {
    console.log(this.events[i]);
    if (!this.events[i].isLike) {
      this.likeService.like(this.events[i].event_id, this.userData.id);
      this.events[i].icon = "heart";
      this.events[i].isLike = !this.events[i].isLike;
    } else {
      this.likeService.unlike(this.events[i].event_id, this.userData.index);
      this.events[i].icon = "heart-empty";
      this.events[i].isLike = !this.events[i].isLike;
    }

  }


  unlike(event_id) {
    this.storage.get('Authorization').then((authToken) => {
      this.likeService.unlike(event_id, authToken);
    });
  }
  openMenu() {
    this.menuController.open('profileMenu');

  }
  segmentChanged(event) {
    this.page = event.detail.value;

  }
  viewPhoto(url, title) {
    let options = {
      share: false,
      closeButton: true
    }
    this.photoViewer.show(url, title, options)
  }


  isPast(event) {
    return date_fns.isPast(event.date);
  }
  isFuture(event) {
    return date_fns.isFuture(event.date);
  }


  getEvents() {
    this.storage.get('Authorization').then((authToken) => {
      this.userService.getEvents(authToken).subscribe((successData) => {
        this.events = successData;
        console.log(this.events)
        this.events.forEach((element, index) => {
          this.events[index]["seeMore"] = false;
          this.events[index]["isCommentOpen"] = false;

          if (this.events[index].user_id == null) {
            this.events[index]["icon"] = "heart-empty";
            this.events[index]["isLike"] = false;
          } else {
            this.events[index]["icon"] = "heart";
            this.events[index]["isLike"] = true;
          }




        });



        console.log(this.events)
      }, (err => console.error(err)));

    }).catch(err => console.error(err));
  }
  trim(string: string) {
    return string.substring(0, 45);
  }


}
