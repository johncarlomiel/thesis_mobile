import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { MyInfoModalPage } from '../modals/my-info-modal/my-info-modal.page';


@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.page.html',
  styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage implements OnInit {
  info: any;
  infoLabel = [
    "Full name", "Year Level", "Course", "Age", "Gender", "Religion", "Place of Birth", "Address", "Phone Number", "Mother's Name",
    "Mother's Religion", "Mother's Occupation", "Father's Name", "Father's Religion", "Father's Job",
    "Are you living with your parents?", "How is your studies?", "How do you go to school?", "Are you allowed to go out night?",
    "Who help you in your studies?", "What are your hobbies during your free time?", "Do you have any friends in school?"
  ];
  constructor(
    private storage: Storage,
    private userService: UserService,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.info = [];
    this.getUserInfo();
  }
  ionViewDidEnter() {
  }
  async presentInfoModal() {
    const modal = await this.modalController.create({
      component: MyInfoModalPage,
      componentProps: { value: 123 }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.isUpdated) {
        this.getUserInfo();
      }
    });

    return await modal.present().catch((error) => { throw error });
  }

  getUserInfo() {
    this.info = Array.apply(null, Array())
    this.storage.get("Authorization").then((authToken) => {
      //Getting user information
      this.userService.getInfo(authToken).subscribe((successData) => {

        if (successData.have_friends) {
          successData.have_friends = "I do have";
        } else {
          successData.have_friends = "I don't have";
        }

        if (successData.not_livingwith_parents == "") {
          successData.not_livingwith_parents = "Yes";
        }
        if (successData.allowed_night == "") successData.allowed_night = "No";

        let arrayHolder = Object.values(successData)

        arrayHolder.forEach((element, index) => {
          this.info.push({ label: this.infoLabel[index], value: element });

        });

        console.log(this.info)

      }, (error) => console.log(error))
      //Getting user information





    }).catch((error) => { throw error; })
  }



}
