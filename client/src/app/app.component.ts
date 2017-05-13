import { Component } from '@angular/core';
import { SubscriptionService } from './services/subscription.service';

@Component({
  moduleId: module.id,
  selector: 'consumerAnalytics',
  templateUrl: `app.component.html`,
  providers: [ SubscriptionService ]
})
export class AppComponent  {

  pageTitle: string ="Consumer Analytics Services"
}
