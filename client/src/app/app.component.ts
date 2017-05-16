import { Component } from '@angular/core';
import { SubscriptionService } from './services/subscription.service';
import {VerificationService} from "./services/verification.service";

@Component({
  moduleId: module.id,
  selector: 'consumerAnalytics',
  templateUrl: `app.component.html`,
  providers: [ SubscriptionService, VerificationService ]
})
export class AppComponent  {

  pageTitle: string ="Consumer Analytics Services"
}
