import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService, private storage: Storage) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.storage.get("Authorization").then((val) => {
      console.log(val)
    });
  }


  login(username, password) {
    this.authService.login(username, password).subscribe((successData) => {
      // set a key/value
      this.storage.set('Authorization', 'Bearer ' + successData);


    },
      (error) => {
        console.log(error)
      });
  }

}
