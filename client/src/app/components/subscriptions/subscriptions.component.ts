import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  moduleId: module.id,
  selector: 'subscriptions',
  templateUrl: `subscriptions.component.html`,
  styleUrls: ['subscriptions.component.css']
})

export class SubscriptionsComponent  {
  phonenumber: number;
  saveSuccess: boolean;

  constructor(private subscriptionService:SubscriptionService){

  }

  addUser(){
    event.preventDefault();

    var newUser = {
      phonenumber: this.phonenumber,
      sms: 1,
      whatsapp: 0
    }

    if(newUser.phonenumber ){
      this.saveSuccess = true;
    }

    this.subscriptionService.addUser(newUser)
      .subscribe()
  }
}
