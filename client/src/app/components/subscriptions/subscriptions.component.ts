import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  moduleId: module.id,
  selector: 'subscriptions',
  templateUrl: `subscriptions.component.html`
})

export class SubscriptionsComponent  {
  phonenumber: number;

  constructor(private subscriptionService:SubscriptionService){

  }

  addUser(){
    event.preventDefault();
    console.log(this.phonenumber);

    var newUser = {
      phonenumber: this.phonenumber,
      sms: 1,
      whatsapp: 0
    }

    this.subscriptionService.addUser(newUser)
      .subscribe();
  }
}
