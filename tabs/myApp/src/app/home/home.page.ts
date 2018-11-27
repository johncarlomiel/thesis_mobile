import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { InfoPage } from '../modals/info/info.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  name: string = "";

  constructor(private storage: Storage,
    private authService: AuthService,
    private modalController: ModalController) { }
  ngOnInit(): void {

    this.storage.get("Authorization").then((authToken) => {
      this.authService.checkSession(authToken).subscribe((successData) => {
        this.name = successData.name;
        console.log(successData)

      },
        (error) => console.log(error));
    })
  }



  async presentInfoModal() {
    const modal = await this.modalController.create({
      component: InfoPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
