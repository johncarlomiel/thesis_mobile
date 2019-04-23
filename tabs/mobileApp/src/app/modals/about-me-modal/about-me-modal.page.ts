import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about-me-modal',
  templateUrl: './about-me-modal.page.html',
  styleUrls: ['./about-me-modal.page.scss'],
})
export class AboutMeModalPage implements OnInit {
  @Input('moreInfo') moreInfo: any;
  constructor(private modalController: ModalController,
    private storage: Storage,
    private userService: UserService,
    private authService: AuthService,
    private toastController: ToastController) { }

  ngOnInit() {
  }


  submit() {
    let verify = false;
    for (let i = 0; i < this.moreInfo.length; i++) {
      if (this.moreInfo[i].value == "" || undefined) {
        verify = false;
        break;
      }
      verify = true;

    }
    if (verify) {
      let data = {
        ttroubling: this.moreInfo[0].value,
        friends: this.moreInfo[1].value,
        happy_expi: this.moreInfo[2].value,
        downful_expi: this.moreInfo[3].value,
        ambition: this.moreInfo[4].value,
        change: this.moreInfo[5].value
      }
      this.storage.get("Authorization").then((authToken) => {
        this.userService.updateMoreInfo(data, authToken).subscribe((successData) => {
          this.presentToastWithOptions().catch((error) => { throw error; });
        }, (error) => { throw error })
      }).catch((error) => { throw error; })
    } else {
      alert("Please fill all questions");

    }

  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Information Updated',
      position: 'top',
      color: "dark",
      duration: 2000,
    });
    toast.present().catch((error) => { throw error });
  }
  return() {
    this.modalController.dismiss({ message: "pop" })

  }
}
