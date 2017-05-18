import { Component } from '@angular/core';
import {VerificationService} from "../../services/verification.service";

@Component({
  moduleId: module.id,
  selector: 'settings',
  templateUrl: `settings.component.html`,
  providers: [VerificationService]
})
export class SettingsComponent {

  constructor(private verificationService: VerificationService) {
    console.log(this.verificationService.user);
    value : boolean = false;
    Existing()
    {
      this.value = !this.value;
    }
  }
}
