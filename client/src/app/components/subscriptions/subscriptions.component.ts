import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import {User} from "../../../../Users";

@Component({
  moduleId: module.id,
  selector: 'subscriptions',
  templateUrl: `subscriptions.component.html`
})

export class SubscriptionsComponent  {
  users: User[];
  phonenumber: number;

  constructor(private subscriptionService:SubscriptionService){

  }

  addUser(event: any){
    event.preventDefault();

    var newUser = {
      phonenumber: this.phonenumber,
      sms: 1,
      whatsapp: 0
    }

    this.subscriptionService.addUser(newUser)
      .subscribe(user => {
        this.users.push(user);
      });
  }
}
