import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService,
    private storage: Storage,
    private loadingController: LoadingController,
    private router: Router) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    //Check user session
    this.storage.get("Authorization").then((authToken) => {
      this.authService.checkSession(authToken).subscribe((successData) => {
        console.log(successData)
      },
        (error) => console.log(error));

    });



  }


  login(username, password) {
    this.authService.login(username, password).subscribe((successData) => {
      // set a key/value
      this.storage.set('Authorization', 'Bearer ' + successData);
      this.presentLoading();
      setTimeout(() => this.router.navigate(["profile"]), 2000);
    },
      (error) => {
        console.log(error)
      });
  }



  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    return await loading.present();
  }

}
