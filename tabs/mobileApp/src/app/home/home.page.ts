import { Component } from '@angular/core';
import io from 'socket.io-client';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notif: any;
  events: any;
  userData: any;
  constructor(
    private storage: Storage,
    private userService: UserService,
    private menuController: MenuController
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

  getEvents() {
    this.storage.get('Authorization').then((authToken) => {
      this.userService.getEvents(authToken).subscribe((successData) => {
        this.events = successData;
        this.events.forEach((element, index) => {
          this.events[index]["seeMore"] = false;
        });


        console.log(this.events)
      }, (err => console.error(err)));

    }).catch(err => console.error(err));
  }
  trim(string: string) {
    return string.substring(0, 45);
  }


}
