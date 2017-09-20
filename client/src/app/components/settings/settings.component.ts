import {Component, Input} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {User} from "../../model/User";
import {VerificationService} from '../../services/verification.service';
import {Router} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: 'settings',
  templateUrl: `settings.component.html`,
  styleUrls: ['settings.component.css']
})
export class SettingsComponent {
  user: User;
  whatsapp_toggle: boolean;
  email_toggle: boolean;
  sms_toggle: boolean;
  saveSuccess: boolean;
  email_entered: boolean;
  phone_entered: boolean;
  whatsapp_toggle_initial: boolean;
  email_toggle_initial: boolean;
  sms_toggle_initial: boolean;
  constructor(private settingsservice: SettingsService, private verificationService: VerificationService, private router: Router) {
    this.user = this.verificationService.user;
    console.log(this.user);

    if (this.user.phonenumber == null) {
      this.phone_entered = false;
    }
    else{
      this.phone_entered = true;}

    if (this.user.email_address ==""){
      this.email_entered = false }
    else {
      this.email_entered = true;
    }


    if (this.user.sms == 1) {
      this.sms_toggle = true;
      this.sms_toggle_initial = true;

    } else {
      this.sms_toggle = false;
      this.sms_toggle_initial = false;
    }

    if (this.user.whatsapp == 1) {
      this.whatsapp_toggle = true;
      this.whatsapp_toggle_initial = true;
    } else {
      this.whatsapp_toggle = false;
      this.whatsapp_toggle_initial = false;
    }
    if (this.user.email == 1) {
      this.email_toggle = true;
      this.email_toggle_initial = true;
    } else {
      this.email_toggle = false;
      this.email_toggle_initial = false;
    }
    console.log(this);

    document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }

  ngOnDestroy(){
    document.body.style.backgroundImage = "none";
  }



  switch(toggle: String) {
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
      if (this.sms_toggle_initial == false){
        this.settingsservice.sendSMSUpdate("subscribe", this.user);
        this.sms_toggle_initial = true;
      }
    } else {
      this.user.sms = 0;
      if (this.sms_toggle_initial == true){
        this.settingsservice.sendSMSUpdate("unsubscribe", this.user);
        this.sms_toggle_initial = false;
      }

    }

    if (this.whatsapp_toggle == true) {
      this.user.whatsapp = 1;
      if (this.whatsapp_toggle_initial ==false){
        this.settingsservice.sendWhatsAppUpdate("subscribe", this.user);
        this.whatsapp_toggle_initial = true;
      }
    } else {
      this.user.whatsapp = 0;
      if (this.whatsapp_toggle_initial == true){
        this.settingsservice.sendWhatsAppUpdate("unsubscribe", this.user);
        this.whatsapp_toggle_initial = false;
      }
    }

    if (this.email_toggle == true) {
      this.user.email = 1;
      if (this.email_toggle_initial == false){
        this.settingsservice.sendEmailUpdate("subscribe", this.user);
        this.email_toggle_initial = true;
      }
    } else {
      this.user.email = 0;
      if (this.email_toggle_initial == true){
        this.settingsservice.sendEmailUpdate("unsubscribe", this.user);
        this.email_toggle_initial = false;
      }
    }

    if (!this.user.email_address.indexOf("")) {
      this.email_entered = true;
    } else if (!this.user.phonenumber.indexOf("")) {
      this.phone_entered = true;
    }
    this.settingsservice.updateSettings(this.user);
    this.saveSuccess = true;
    this.router.navigate(['./verification']);




  }

}
