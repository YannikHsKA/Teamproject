import {Component} from '@angular/core';
import {SubscriptionService} from './services/subscription.service';
import {VerificationService} from "./services/verification.service";
import {SettingsService} from "./services/settings.service";

@Component({
  moduleId: module.id,
  selector: 'consumerAnalytics',
  templateUrl: `app.component.html`,
  providers: [SubscriptionService, VerificationService, SettingsService]
})
export class AppComponent {

  pageTitle: string = "Consumer Analytics Services"
}
