import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sds-result',
  templateUrl: './sds-result.page.html',
  styleUrls: ['./sds-result.page.scss'],
})
export class SdsResultPage implements OnInit {
  userCodes = Array.apply(null, Array());
  constructor(private storage: Storage,
    private authService: AuthService,
    private modalController: ModalController,
    private userService: UserService) { }

  ngOnInit() {

    //Get Code Information
    this.storage.get("Authorization").then((authToken) => {
      this.userService.getUserCode(authToken).subscribe((successData) => {
        this.userCodes = successData;
        console.log(this.userCodes)
      }, (error) => { console.log(error) });

    }).catch((error) => console.log(error))
  }

}
