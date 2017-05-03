import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  moduleId: module.id,
  selector: 'subscriptions',
  templateUrl: `subscriptions.component.html`
})

export class SubscriptionsComponent  {
  tel: number;

  constructor(private subscriptionService:SubscriptionService){

  }

  addTel(event: any){
    event.preventDefault();
    console.log(this.tel);
  }
}
