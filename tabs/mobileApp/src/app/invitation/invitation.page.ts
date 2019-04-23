import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InvitationService } from '../services/invitation/invitation.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {
  invitations: Array<any>
  constructor(private storage: Storage, private invitationService: InvitationService, private toastController: ToastController) { }

  ngOnInit() {
    this.getPendingInvitations();
  }
  accept(event_id) {
    this.storage.get("Authorization").then((authToken) => {
      this.invitationService.acceptInvitation(authToken, event_id).subscribe((res) => {
        console.log(res);
        this.presentToast();
        this.getPendingInvitations();

      }, (err) => console.log(err));

    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Invitation Response Submitted',
      duration: 3000,
      position: "top"
    });
    toast.present();
  }
  decline(event_id) {
    this.storage.get("Authorization").then((authToken) => {
      this.invitationService.declineInvitation(authToken, event_id).subscribe((res) => {
        console.log(res);
        this.presentToast();
        this.getPendingInvitations();

      }, (err) => console.log(err));

    });
  }

  getPendingInvitations() {
    this.storage.get("Authorization").then((authToken) => {
      this.invitationService.getPendingInvitation(authToken).subscribe((invitations) => {
        this.invitations = invitations;
      }, (err) => console.log(err));
    });
  }
  trim(string: string) {
    return string.substring(0, 45);
  }

}
