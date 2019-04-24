import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from './services/user.service';
import { UserProgressService } from './services/user-progress.service';
import io from 'socket.io-client';
import { config } from './configs/config';
import { ChatService } from './services/chat/chat.service';
import { timer } from 'rxjs';
import { LocalNotifications, ILocalNotificationActionType } from '@ionic-native/local-notifications/ngx';
import { MessagePage } from './modals/message/message.page';
import { InvitationService } from './services/invitation/invitation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  chatSocket: any;
  progress: any;
  isQualified = false;
  user_data: any;
  showSplash = true;
  contacts: any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private userProgService: UserProgressService,
    private chatService: ChatService,
    private localNotifications: LocalNotifications,
    private modalController: ModalController,
    private invitationService: InvitationService


  ) {

    this.initializeApp();

    this.chatSocket = io(config.IP + '/chat');
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.



  }
  ionViewDidLoad() {
    // Put here the code you want to execute

  }

  checkProfileProgress() {
    this.storage.get("Authorization").then((authToken) => {
      this.userProgService.getProgress(authToken).subscribe((successData) => {
        console.log(successData)
        //Check if qualified to verify his account
        let values_arr = Object.values(successData[0])
        for (let index = 0; index < values_arr.length; index++) {
          console.log(values_arr[index])
          if (values_arr[index]) {
            this.isQualified = true;
          } else {
            this.isQualified = false;
            break;
          }

        }




        this.progress = successData[0];
        console.log(this.progress)
      }, (error) => console.log(error));

    });

  }

  getUserData() {
    this.storage.get("user_data").then((data) => {
      this.user_data = data;
      console.log(this.user_data)
    }).catch((err) => console.log(err));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => {
        this.showSplash = false;
      });







      this.storage.get('user_data').then((data) => {
        this.chatService.login(data.id);
        this.user_data = data;
        this.storage.get("Authorization").then((authToken) => {
          this.joinAllContactsRoom(authToken);
          this.getNewMessagesForNotif(authToken);
          this.getNewInvitations(authToken);

          console.log(authToken)
          this.chatService.getNewInvitation().subscribe((invitations) => {
            console.log(invitations);
            this.localNotifications.hasPermission().then((granted) => {
              if (!granted) {
                this.localNotifications.requestPermission();
              } else {
                invitations.forEach((element, index) => {
                  this.localNotifications.schedule({
                    id: index + 1,
                    title: `You are invited to an event: ${element.name}`,
                    icon: element.poster_url,
                    text: element.time_from + " - " + element.time_to,
                    sound: this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
                    data: { event_id: element.event_id, authToken: authToken },
                    actions: [
                      { id: 'yes', title: 'Accept', type: ILocalNotificationActionType.BUTTON },
                      { id: 'no', title: 'Decline', type: ILocalNotificationActionType.BUTTON }
                    ]
                  })
                });
              }
            })
          }, (err) => console.log(err));



          this.localNotifications.on('click').subscribe((notif) => {
            if (notif.data.contact_user_id && notif.data.convo_name && notif.data.contact_name) {
              this.messageModal(notif.data.contact_user_id, notif.data.convo_name, notif.data.contact_name);
            } else {
              this.router.navigate(["/invitation"]);

            }
          });
          this.localNotifications.on('yes').subscribe((notif) => {
            this.invitationService.acceptInvitation(notif.data.authToken, notif.data.event_id).subscribe((res) => alert(res.message), (err) => alert(JSON.stringify(err)));
          });
          this.localNotifications.on('no').subscribe((notif) => {
            this.invitationService.declineInvitation(notif.data.authToken, notif.data.event_id).subscribe((res) => alert(res.message), (err) => alert(JSON.stringify(err)));;
          });



        });

      }).catch((err) => console.log(err));
    });




  }

  getNewInvitations(authToken) {
    this.invitationService.getPendingInvitation(authToken).subscribe((invitations) => {
      this.localNotifications.hasPermission().then((granted) => {
        if (!granted) {
          this.localNotifications.requestPermission();
        } else {
          let notif = [];

          invitations.forEach((element, index) => {
            notif.push({
              title: `You are invited to an event: ${element.name}`,
              id: index + 1,
              icon: element.poster_url,
              text: element.time_from + " - " + element.time_to,
              sound: this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
              data: { event_id: element.event_id, authToken },
              actions: [
                { id: 'yes', title: 'Accept', type: ILocalNotificationActionType.BUTTON },
                { id: 'no', title: 'Decline', type: ILocalNotificationActionType.BUTTON }
              ]
            });


          });
          this.localNotifications.schedule(notif)
        }
      })
    }, (err) => console.log(err));
  }

  getNewMessagesForNotif(authToken) {
    this.chatService.getContacts(authToken).subscribe((responseData) => {
      this.contacts = responseData;
      console.log(this.contacts)



      this.localNotifications.hasPermission().then((granted) => {
        if (!granted) {
          this.localNotifications.requestPermission();
        } else {

          responseData.forEach((element, index) => {
            this.chatService.getNewMessagesForNotif(authToken, element.contact_user_id, element.convo_name)
              .subscribe((resData) => {
                console.log(element);
                if (resData.length != 0) {

                  this.localNotifications.schedule({
                    title: `Message From ${element.name}`,
                    icon: element.dp_path,
                    id: index + 1,
                    text: resData,
                    sound: this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
                    data: { convo_name: element.convo_name, contact_user_id: element.contact_user_id, contact_name: element.name },
                  })

                }

              });
          });
        }
      })







    }, (err) => console.log(err));
  }
  async messageModal(contact_user_id, convo_name, contact_name) {
    const modal = await this.modalController.create({
      component: MessagePage,
      componentProps: { contact_user_id, convo_name, contact_name, user_data: this.user_data }
    });
    return await modal.present().catch((error) => { throw error });

  }


  joinAllContactsRoom(authToken) {
    this.chatService.getContacts(authToken).subscribe((responseData) => {
      //Join all of the conversion room for every contact user
      console.log(this.user_data);
      this.chatService.joinAllContactsRoom(responseData, this.user_data);


      this.chatService.getNewNotification().subscribe((responseData) => {
        console.log(responseData);
        let messages = responseData.reverse();
        this.localNotifications.hasPermission().then((granted) => {
          if (!granted) {
            this.localNotifications.requestPermission();
          } else {
            let notificationTexts = [];
            messages.forEach(element => {
              notificationTexts.push({ person: element.name, message: element.message });
            });

            this.localNotifications.schedule(
              {
                id: 2,
                title: `Message From ${responseData[0].name}`,
                icon: responseData[0].dp_path,
                text: notificationTexts,
                sound: this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
                data: { convo_name: responseData[0].convo_name, contact_user_id: responseData[0].id, contact_name: responseData[0].name },




              }
            );

          }
        })
      }, (err) => console.log(err));


    }, (err) => console.log(err));

  }

  logout() {
    // this.chatSocket.emit('logout', this.user_data.id);
    this.storage.get('Authorization').then((authToken) => {
      this.chatService.getContacts(authToken).subscribe((contacts) => {
        contacts.forEach(element => {
          let data = {
            id: this.user_data.id,
            convo_name: element.convo_name
          }
          this.chatService.logout(data);
        });

        this.storage.clear().then(() => {


          this.router.navigate(["/login"]);
        }).catch((err) => console.log(err));
      });
    });






  }


}


