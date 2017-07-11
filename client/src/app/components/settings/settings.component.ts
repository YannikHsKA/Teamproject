import {Component, Input} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {User} from "../../../../User";
import {VerificationService} from '../../services/verification.service';
@Component({
  moduleId: module.id,
  selector: 'settings',
  templateUrl: `settings.component.html`
})
export class SettingsComponent {
  user: User;
  whatsapp_toggle: boolean;
  email_toggle: boolean;
  sms_toggle: boolean;
  saveSuccess: boolean;

  constructor(private settingsservice: SettingsService, private verificationService: VerificationService) {
    this.user = this.verificationService.user;
    console.log(this.user);

    if (this.user.sms == 1) {
      this.sms_toggle = true;

    } else {
      this.sms_toggle = false;
    }

    if (this.user.whatsapp == 1) {
      this.whatsapp_toggle = true;
    } else {
      this.whatsapp_toggle = false;
    }
    if (this.user.email == 1) {
      this.email_toggle = true;
    } else {
      this.email_toggle = false;
    }
    console.log(this);
  }


  switch(toggle: String) {
    //  console.log(toggle);
    switch (toggle) {

      case 'whatsapp':
        this.whatsapp_toggle = !this.whatsapp_toggle;
        break;
      case 'sms':
        this.sms_toggle = !this.sms_toggle;
        break;
      case 'email':
        this.email_toggle = !this.email_toggle;
        break;
    }

  }

  saveSettings() {
    if (this.sms_toggle == true) {
      this.user.sms = 1;

    } else {
      this.user.sms = 0;
    }

    if (this.whatsapp_toggle == true) {
      this.user.whatsapp = 1;
    } else {
      this.user.whatsapp = 0;
    }

    if (this.email_toggle == true) {
      this.user.email = 1;
    } else {
      this.user.email = 0;
    }


    this.settingsservice.updateSettings(this.user);
    this.saveSuccess = true;
  }

}
