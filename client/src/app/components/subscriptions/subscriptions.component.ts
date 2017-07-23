import {Component} from '@angular/core';
import {User} from '../../../../User.js';
import {SubscriptionService} from '../../services/subscription.service';



@Component({
  moduleId: module.id,
  selector: 'subscriptions',
  templateUrl: `subscriptions.component.html`,
  styleUrls: ['subscriptions.component.css']
})

export class SubscriptionsComponent {
  phonenumber: string;
  email_address: string;
  saveSuccess: boolean;



  constructor(private subscriptionService: SubscriptionService) {
    document.body.style.backgroundImage = "url('src/assets/bg.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }

  ngOnDestroy(){
    document.body.style.backgroundImage = "none";
  }



  addUser() {

    event.preventDefault();
    let newUser = new User();
    newUser.phonenumber = this.phonenumber;
    newUser.email_address = this.email_address;
    newUser.sms = 1;
    if (newUser.phonenumber) {
      this.saveSuccess = true;
      newUser.sms = 1;
    }
if (newUser.email_address){
      newUser.email =1;
}
    this.subscriptionService.addUser(newUser)
      .subscribe()
  }
}
