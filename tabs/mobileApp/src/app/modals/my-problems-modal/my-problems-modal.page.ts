import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, NavParams, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { problems } from '../../data/problems';

@Component({
  selector: 'app-my-problems-modal',
  templateUrl: './my-problems-modal.page.html',
  styleUrls: ['./my-problems-modal.page.scss'],
})
export class MyProblemsModalPage implements OnInit {
  holder: Object;
  problems = Array.apply(null, Array())
  slideOpts: Object;
  currentIndex = 0;
  constructor(private storage: Storage,
    private authService: AuthService,
    private modalController: ModalController,
    private userService: UserService,
    private navParams: NavParams,
    private toastController: ToastController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.problems = problems.problems;
    console.log(this.problems)



    this.slideOpts = {
      effect: 'flip',
      autoHeight: true
    }
  }


  async next() {
    if (this.currentIndex == this.problems.length - 1) {
      console.log(this.problems)
      await this.storage.get("Authorization").then((authToken) => {
        this.presentLoading();
        this.userService.updateProblem(this.problems, authToken).subscribe((successData) => {
          console.log(successData)
          this.loadingController.dismiss();


          this.presentToastWithOptions();
          this.modalController.dismiss({ message: "Updated", isUpdated: true });
        }, (error) => console.log(error))
      })


    } else {
      this.currentIndex++;
    }

  }

  return() {
    this.modalController.dismiss({ message: "pop", isUpdated: false })

  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Information Updated',
      position: 'top',
      color: "dark",
      duration: 5000,
    });
    toast.present().catch((error) => { throw error; });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Updating...',
      duration: 4000
    });
    return await loading.present();


  }

}
