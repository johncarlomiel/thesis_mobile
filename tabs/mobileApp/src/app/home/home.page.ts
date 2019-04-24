import { Component } from '@angular/core';
import io from 'socket.io-client';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';
import { MenuController } from '@ionic/angular';
import * as date_fns from 'date-fns';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

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
    private photoViewer: PhotoViewer
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.notif)
    this.getEvents();

    this.storage.get("user_data").then((userData) => {
      this.userData = userData;
    }).catch((error) => console.log(error))

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

  getEvents() {
    this.storage.get('Authorization').then((authToken) => {
      this.userService.getEvents(authToken).subscribe((successData) => {
        this.events = successData;
        this.events.forEach((element, index) => {
          this.events[index]["seeMore"] = false;
          if (date_fns.isPast(this.events[index].date)) {
            this.pastEvents.push(this.events[index]);
            console.log(element)

          } else {
            this.incomingEvents.push(this.events[index]);
            console.log()
          }
        });
        console.log(this.pastEvents);
        console.log(this.incomingEvents);



        console.log(this.events)
      }, (err => console.error(err)));

    }).catch(err => console.error(err));
  }
  trim(string: string) {
    return string.substring(0, 45);
  }


}
