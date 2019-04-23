import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { AboutMeModalPage } from '../modals/about-me-modal/about-me-modal.page';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.page.html',
  styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage implements OnInit {
  moreInfo: any;

  constructor(
    private storage: Storage,
    private userService: UserService,
    private modalController: ModalController,


  ) { }

  ngOnInit() {
    this.getMoreUserInfo();
  }

  async presentMoreInfoModal() {
    const modal = await this.modalController.create({
      component: AboutMeModalPage,
      componentProps: { moreInfo: this.moreInfo }
    });
    modal.onDidDismiss().then((data) => this.getMoreUserInfo());
    return await modal.present().catch((error) => { throw error });

  }


  getMoreUserInfo() {
    this.storage.get("Authorization").then((authToken) => {
      //Getting user more information
      this.userService.getMoreInfo(authToken).subscribe((successData) => {
        this.moreInfo = Array.apply(null, Array());
        let moreInfoLabels = [
          "My ambition in life is to be/become",
          "My downful experience", "My happiest experience",
          "Someone i can talk to about my problems",
          "Problems that are troubling me the most",
          "I want to change my"
        ]
        let moreInfoValue = Object.values(successData);
        moreInfoValue.forEach((element, index) => {
          this.moreInfo.push({ label: moreInfoLabels[index], value: element });
        });
        console.log(this.moreInfo)
      }, (error) => { throw error; });

      //Getting user more information
    }).catch((error) => console.log(error))
  }

}
