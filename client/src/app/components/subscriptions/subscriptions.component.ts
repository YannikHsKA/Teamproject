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
  whatsapp_number: string;


  constructor(private subscriptionService: SubscriptionService) {
    this.registerPhone = false;
    this.registerMail = false;
    this.registerWhatsapp = false;

    document.body.style.backgroundImage = "url('src/assets/bg.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = "none";
  }


  addUser() {

    event.preventDefault();
    let newUser = new User();
    newUser.phonenumber = this.phonenumber;
    newUser.email_address = this.email_address;


    if (this.phonenumber) {
      newUser.phonenumber = this.phonenumber;
      this.saveSuccess = true;
      newUser.sms = 1;
    }
    if (newUser.email_address) {
      this.saveSuccess = true;
      newUser.email = 1;
    }
    if (this.whatsapp_number){
      newUser.phonenumber = this.whatsapp_number;
      this.saveSuccess = true;
      newUser.whatsapp = 1;
    }
    this.subscriptionService.addUser(newUser)
      .subscribe()

  }

  showPhoneFields() {
    this.email_address = null;
    this.saveSuccess = false;
    if (!this.registerPhone && this.registerMail) {
      this.registerPhone = true;
      this.registerWhatsapp = false;
      this.registerMail = false;
    } else if(!this.registerPhone){
      this.registerPhone = true;
    } else{
      this.registerPhone = false;
    }
  }


  showWhatsappFields() {

    this.saveSuccess = false;
      this.registerWhatsapp = true;
      this.registerMail = false;
      this.registerPhone = false;

  }

  showMailFields() {
    this.phonenumber = null;
    this.saveSuccess = false;
        this.registerMail = true;
        this.registerWhatsapp = false;
        this.registerPhone = false;
  }

}
