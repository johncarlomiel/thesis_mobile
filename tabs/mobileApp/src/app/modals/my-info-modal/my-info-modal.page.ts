import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-info-modal',
  templateUrl: './my-info-modal.page.html',
  styleUrls: ['./my-info-modal.page.scss'],
})
export class MyInfoModalPage implements OnInit {
  livingWithParents: Boolean = false;
  allowedDuringNight: Boolean = false;
  haveFriends: Boolean = false;
  bday: String = new Date().toISOString();
  notLive: any;
  allowed: any;
  data = {
    name: "", course: "", age: 0, gender: "", religion: "",
    placeOfBirth: "", addr: "", cpNum: 0, motherName: "",
    motherReligion: "", motherJob: "", fatherName: "",
    fatherReligion: "", fatherJob: "", notLivingWithParents: "",
    studyStatus: "", transpo: "", allowedNight: "",
    studyHelper: "", hobby: "", haveFriends: false, year: ""
  }

  courses = ["BSCS", "BSIT", "ACT", "MAEd", "MAN", "MBM", "MPA", "BSN", "BSM",
    "BSA", "BSBA-FM", "BSBA-HRM", "BSBA-MM", "BSEMC", "BACOM", "BECEd", "BACAEd", "BEEd", "BPEd", "BSEd",
    "BSHM", "BSTM"];
  yearLevel = ["1st", "2nd", "3rd", "4th"];
  constructor(private modalController: ModalController,
    private storage: Storage,
    private userService: UserService,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {

    this.storage.get("Authorization").then((data) => {
      this.authService.checkSession(data).subscribe((successData) => {
        console.log(successData)
      }, (error) => console.log(error))
    }).catch((error) => { throw error; });


  }


  return() {
    this.modalController.dismiss({ message: "pop", isUpdated: false })

  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  setLivingWithParents() {
    this.livingWithParents = !this.livingWithParents;
    console.log(this.livingWithParents)

  }
  setAllowedDuringNight() {
    this.allowedDuringNight = !this.allowedDuringNight;
  }
  setHaveFriends() {
    this.haveFriends = !this.haveFriends;
  }




  submit(name, course, age, gender, religion,
    placeBirth, addr, cpnum, motherName, motherReligion, motherJob,
    fatherName, fatherReligion, fatherJob, howStudies,
    transpo, hobby, studyHelper, year) {
    let verify = false;
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i] == "" || undefined) {
        verify = false;
        break;
      }
      verify = true;

    }

    if (verify) {
      this.data.name = name; this.data.course = course; this.data.age = age; this.data.gender = gender; this.data.religion = religion;
      this.data.placeOfBirth = placeBirth; this.data.addr = addr; this.data.cpNum = cpnum; this.data.motherName = motherName;
      this.data.motherReligion = motherReligion; this.data.motherJob = motherJob; this.data.fatherName = fatherName;
      this.data.fatherReligion = fatherReligion; this.data.fatherJob = fatherJob; this.data.studyStatus = howStudies;
      this.data.transpo = transpo; this.data.hobby = hobby; this.data.studyHelper = studyHelper; this.data.year = year;

      //Check other requirements
      if (this.livingWithParents == false) { this.data.notLivingWithParents = this.notLive }
      else { this.data.notLivingWithParents = ""; }
      if (this.allowedDuringNight) {
        this.data.allowedNight = this.allowed;
      } else {
        this.data.allowedNight = "";

      }
      if (this.haveFriends) {
        this.data.haveFriends = true
      } else {
        this.data.haveFriends = false
      }
      console.log(this.bday)
      console.log(this.data)
      this.storage.get("Authorization").then((token) => {
        this.userService.updateInfo(this.data, token).subscribe((successData) => {
          this.presentToastWithOptions().catch((error) => { throw error });
          this.modalController.dismiss({ message: "Updated", isUpdated: true });
        },
          (error) => console.log(error));

      }).catch((error) => { throw error; });


    } else {
      this.presentAlert("You need to fill all the fields to update your profile");
    }

  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Information Updated',
      position: 'top',
      color: "tertiary",
      duration: 2000,
    });
    toast.present().catch((error) => { throw error });
  }

}
