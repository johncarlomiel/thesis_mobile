import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  livingWithParents: Boolean = false;
  allowedDuringNight: Boolean = false;
  courses = ["BSCS", "BSIT", "ACT", "MAEd", "MAN", "MBM", "MPA", "BSN", "BSM",
    "BSA", "BSBA-FM", "BSBA-HRM", "BSBA-MM", "BSEMC", "BACOM", "BECEd", "BACAEd", "BEEd", "BPEd", "BSEd",
    "BSHM", "BSTM"];
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  return() {
    this.modalController.dismiss({ message: "pop" })

  }

  setLivingWithParents() {
    this.livingWithParents = !this.livingWithParents;
    console.log(this.livingWithParents)

  }
  setAllowedDuringNight() {
    this.allowedDuringNight = !this.allowedDuringNight;
  }
}
