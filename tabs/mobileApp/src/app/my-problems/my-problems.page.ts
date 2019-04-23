import { Component, OnInit } from '@angular/core';
import { problems } from '../data/problems';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';
import { labels } from '../models/problemLabel';
import { title } from '../models/problemTitle';
import { ModalController } from '@ionic/angular';
import { MyProblemsModalPage } from '../modals/my-problems-modal/my-problems-modal.page';

@Component({
  selector: 'app-my-problems',
  templateUrl: './my-problems.page.html',
  styleUrls: ['./my-problems.page.scss'],
})
export class MyProblemsPage implements OnInit {
  userProblem: any;
  problem: any;
  labelArray: any;
  problemTitle: any;
  isProblemsUpdated = false;
  constructor(
    private storage: Storage,
    private userService: UserService,
    private modalController: ModalController

  ) { }

  ngOnInit() {
    this.getProblems();
  }

  async presentProblemModal() {
    const modal = await this.modalController.create({
      component: MyProblemsModalPage,
      componentProps: { problems: "" }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.isUpdated) {
        this.getProblems()
      }
    });
    return await modal.present().catch((error) => { throw error });
  }


  getProblems() {
    this.userProblem = Array.apply(null, Array())
    this.storage.get("Authorization").then((authToken) => {
      this.userService.getProblems(authToken).subscribe((successData) => {


        this.problem = problems.problems;
        this.labelArray = labels;
        let label_holder = Object.keys(successData);
        label_holder.splice(0, 1)
        let value_holder = Object.values(successData);
        value_holder.splice(0, 1)
        let currentIndex = 0;
        this.problemTitle = title;

        // this.problemTitle.forEach((element, index) => {
        //   if (this.problemTitle[index].questions.length != 0) {
        //     this.problemTitle[index].questions = Array.apply(null, Array())
        //   }
        // });
        this.problemTitle = this.problemTitle.map(x => ({ name: x.name, questions: Array.apply(null, Array()) }))


        console.log(this.problemTitle)

        this.labelArray.forEach((element, index) => {


          if (element.fieldname == label_holder[index]) {
            this.labelArray[index].value = value_holder[index]
          }
          if (index == 9) { currentIndex++ }
          else if (index == 14) { currentIndex++ }
          else if (index == 22) { currentIndex++ }
          else if (index == 30) { currentIndex++ }
          else if (index == 37) { currentIndex++ }
          else if (index == 48) { currentIndex++ }
          else if (index == 55) { currentIndex++ }
          else if (index == 75) { currentIndex++ }
          else if (index == 79) { currentIndex++ }
          if (this.labelArray[index].value) {
            this.problemTitle[currentIndex].questions.push(this.labelArray[index])
          }

        });


        this.problemTitle.forEach((element, index) => {

          console.log(element.questions.length)
          if (element.questions.length > 0) {
            this.userProblem.push(element)
            this.isProblemsUpdated = true;
          }

        });







      }, (error) => console.log(error))
    }).catch((error) => console.log(error))



  }

}
