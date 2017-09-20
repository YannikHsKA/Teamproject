import {Component} from '@angular/core';
import {User} from '../../model/User.js';
import {SubscriptionService} from '../../services/subscription.service';


@Component({
  moduleId: module.id,
  selector: 'subscriptions',
  templateUrl: `subscriptions.component.html`,
  styleUrls: ['subscriptions.component.css']
})

export class SubscriptionsComponent {
  phonenumber: string;
  email_address: string;
  saveSuccess: boolean;
  registerPhone: boolean;
  registerMail: boolean;
  registerWhatsapp: boolean;
  registerAlexa: boolean;
  whatsapp_number: string;
  alexa_id: string;


  constructor(private subscriptionService: SubscriptionService) {
    this.registerPhone = false;
    this.registerMail = false;
    this.registerWhatsapp = false;
    this.registerAlexa = false;

    document.body.style.backgroundImage = "url('src/assets/bg.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = "none";
  }


  addUser(mode: number) {
    console.log("AddUser");
    let newUser = new User();

    switch (mode) {
      case 1:
        console.log(mode);
        newUser.phonenumber = this.phonenumber;
        this.saveSuccess = true;
        newUser.sms = 1;
        break;
      case 2:
        console.log(mode);
        newUser.email_address = this.email_address;
        this.saveSuccess = true;
        newUser.email = 1;
        break;

      case 3:
        console.log(mode);
        newUser.phonenumber = this.whatsapp_number;
        this.saveSuccess = true;
        newUser.whatsapp = 1;
        break;
    }

    console.log(newUser)
    this.subscriptionService.addUser(newUser, mode)
      .subscribe()
  }

  showPhoneFields() {
    this.email_address = null;
    this.whatsapp_number = null;
    this.alexa_id = null;
    this.saveSuccess = false;
    this.registerPhone = true;
    this.registerWhatsapp = false;
    this.registerMail = false;
    this.registerAlexa = false;

  }


  showWhatsappFields() {
    this.email_address = null;
    this.phonenumber = null;
    this.alexa_id = null;
    this.saveSuccess = false;
    this.registerWhatsapp = true;
    this.registerMail = false;
    this.registerPhone = false;
    this.registerAlexa = false;

  }

  showMailFields() {
    this.whatsapp_number = null;
    this.phonenumber = null;
    this.alexa_id = null;
    this.saveSuccess = false;
    this.registerMail = true;
    this.registerWhatsapp = false;
    this.registerPhone = false;
    this.registerAlexa = false;
  }

  showAlexaFields()
  {
    this.whatsapp_number = null;
    this.phonenumber = null;
    this.email_address = null;
    this.saveSuccess = false;
    this.registerMail = false;
    this.registerWhatsapp = false;
    this.registerPhone = false;
    this.registerAlexa = true;

  }
}
