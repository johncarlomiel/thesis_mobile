import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { ModalController, IonContent, Platform } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Storage } from '@ionic/storage';
import io from 'socket.io-client';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AuthService } from 'src/app/services/auth.service';
import * as date_fns from "date-fns";

import { config } from '../../configs/config';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: '0'
      })),
      state('*', style({
        opacity: '1'
      })),
      transition('*=>state1', animate('150ms ease-in'))
    ])
  ]
})
export class MessagePage implements OnInit {
  @Input("contact_user_id") contact_user_id;
  @ViewChild('message') messageBox: any;
  @Input("convo_name") convo_name;
  @Input("contact_name") contact_name;
  @Input("user_data") user_data;
  @ViewChild(IonContent) content: IonContent;
  messages = [];
  messages_storage = [];
  isOnline = false;
  chatSocket: any;
  counter = 0;
  isLoading = true;
  limit = 10;
  isNew = false;
  currentDataLength = 10;

  mutationObserver: MutationObserver;
  constructor(
    private modalController: ModalController,
    private chatService: ChatService,
    private storage: Storage,
    private authService: AuthService,
    private localNotifications: LocalNotifications,
    private platform: Platform
  ) {
    console.log(this.contact_user_id)
    this.getMessages();
  }

  seenAllMessages() {
    this.storage.get("Authorization").then((authData) => {
      let contact_info = {
        contact_user_id: this.contact_user_id,
        convo_name: this.convo_name
      }
      this.chatService.seenAllMessages(authData, contact_info).subscribe((responseData) => {
        console.log(responseData);

      }, (err) => console.log(err));
    });
  }

  ionViewDidEnter() {
    console.log("loaded")
    this.content.scrollToBottom(0).then((data) => this.isLoading = false).catch((err) => console.log("error"))


  }
  ionViewWillEnter(): void {


  }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/shame.mp3'
    } else {
      return 'file://assets/sounds/bell.mp3'
    }
  }

  ngOnInit() {


    //Seen all messages
    this.seenAllMessages();


    //Event that receive new message from server
    this.chatService.getNewMessages().subscribe((msgs) => {

      this.isLoading = true;
      this.currentDataLength = msgs.length;
      this.messages = msgs.reverse();
      this.content.scrollToBottom(0);

      setTimeout(() => {
        this.isLoading = false;
        console.log("loading now functioning")
      }, 500)
      console.log(msgs)
    });




  }
  sendMessage(msg) {
    this.messageBox.value = "";

    this.storage.get("Authorization").then((authToken) => {

      this.chatService.sendMessage(msg, authToken, this.limit, this.convo_name);

    }).catch((err) => console.log(err));
  }

  loadData(event) {
    console.log(this.isLoading)
    if (!this.isLoading) {
      if (this.limit <= this.currentDataLength) {
        this.limit += 10;
        this.storage.get("Authorization").then((authData) => {

          this.chatService.getMessages(authData, this.contact_user_id, this.convo_name, this.limit)
            .subscribe((successData) => {
              this.currentDataLength = successData.length;
              this.messages = successData.reverse();
              event.target.complete();

            }, (error) => console.log(error));



        }).catch((err) => console.log(err))
      } else {
        event.target.disabled = true;
      }

    }
  }

  getMessages() {
    this.isNew = true;
    this.storage.get("Authorization").then((authToken) => {
      this.chatService.getMessages(authToken, this.contact_user_id, this.convo_name, this.limit)
        .subscribe((successData) => {
          console.log(successData);
          this.currentDataLength = successData.length;
          console.log(this.messages_storage)
          this.messages = successData.reverse();
          setTimeout(() => this.isNew = false, 500)
        }, (error) => console.log(error));
    }).catch((err) => console.log(err))
  }





  return() {
    this.modalController.dismiss({ message: "pop" })

  }

  convertDate(date) {
    return date_fns.format(date, 'MMMM Do YYYY hh:mm A');
  }
  processDate(date, index) {
    if (index % 5 == 0) {
      return date_fns.format(date, "hh mm A");
    } else {
      return '';
    }
  }



}
