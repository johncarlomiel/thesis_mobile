import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { MessagePage } from '../modals/message/message.page';
import { AuthService } from '../services/auth.service';
import * as io from 'socket.io-client';
import * as date_fns from 'date-fns';

import { config } from '../configs/config';



@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  contacts = [];
  user_data: any;
  chatSocket: any;
  // public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private chatService: ChatService,
    private storage: Storage,
    private modalController: ModalController,
    private authService: AuthService
  ) {










  }

  async messageModal(contact_user_id, convo_name, contact_name) {
    const modal = await this.modalController.create({
      component: MessagePage,
      componentProps: { contact_user_id, convo_name, contact_name, user_data: this.user_data }
    });
    modal.onDidDismiss().then(() => this.getContacts());
    return await modal.present().catch((error) => { throw error });

  }

  ionViewDidEnter() {
    this.getContacts();

  }
  getContacts() {
    this.storage.get("Authorization").then((authToken) => {
      this.authService.getPayload(authToken).subscribe((successData) => {
        this.user_data = successData;
      }, (error) => console.log(error))


      this.chatService.getContacts(authToken).subscribe((successData) => {
        console.log(successData);
        this.contacts = successData;
        //Join all of the conversion room for every contact user
        this.chatService.joinAllContactsRoom(this.contacts, this.user_data);
        this.chatService.getNewSingleMessage().subscribe((msg) => {
          if (this.contacts.some((contact) => contact.convo_name === msg.convo_name)) {
            for (const key in this.contacts) {
              if (this.contacts[key].convo_name === msg.convo_name) {
                this.contacts[key].recent_msg = msg.message;
                break;
              }
            }
          }
        });

        this.chatService.getNewOnlineUser().subscribe((id) => {
          if (this.contacts.some((contact) => contact.contact_user_id === id)) {
            for (const key in this.contacts) {
              //Check if it the id 
              //If not continue to next iteration
              if (this.contacts[key].contact_user_id === id) {
                this.contacts[key].isOnline = true;
                break;
              } else {
                continue;
              }
            }
          }
        });

        this.chatService.getNewOfflineUser().subscribe((data) => {
          if (this.contacts.some((contact) => contact.contact_user_id === data.id)) {
            for (const key in this.contacts) {
              //Check if it the id 
              //If not continue to next iteration
              if (this.contacts[key].contact_user_id === data.id) {
                this.contacts[key].isOnline = false;
                this.contacts[key].last_online = data.date;
                break;
              } else {
                continue;
              }
            }
          }
        });



      }, (error) => console.log(error))

    }).catch((err) => console.log(err))
  }
  ngOnInit() {


  }

  durationLastOnline(date) {
    return date_fns.distanceInWordsToNow(date);
  }

}
