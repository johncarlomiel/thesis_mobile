import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

import { config } from '../configs/config';
import { ChatService } from '../services/chat/chat.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logo = "assets/icon/icon.png"
  chatSocket: any;
  constructor(private authService: AuthService,
    private storage: Storage,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private chatService: ChatService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    //Check user session
    this.storage.get("Authorization").then((authToken) => {
      if (authToken != null) {

        this.authService.checkSession(authToken).subscribe((successData) => {
          this.router.navigate(["/home"])
        },
          (error) => { throw error; });
      }

    }).catch((error) => { throw error });



  }


  login(username, password) {

    this.presentLoading().catch((error) => { throw error; });
    this.authService.login(username, password).subscribe((successData) => {
      // set a key/value
      this.storage.set('Authorization', 'Bearer ' + successData).then(() => {

      }).finally(() => {
        this.authService.getPayload('Bearer ' + successData).subscribe((successData) => {
          this.storage.set("user_data", successData).then(() => {
            // this.chatSocket = io(config.IP + '/chat');
            this.chatService.login(successData.id);
            console.log(successData);


          }).finally(() => {
            this.loadingController.dismiss();
            this.router.navigate(["/home"]);
          });




        }, (error) => alert(error))
      });


    },
      (error) => {
        this.presentAlert();
      });
  }





  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging In',
      duration: 50000
    });
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
    return await loading.present().catch((error) => { throw error; });
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Authentication Error!',
      message: 'Wrong username or password',
      buttons: ['OK']

    });

    await alert.present();
  }

}
