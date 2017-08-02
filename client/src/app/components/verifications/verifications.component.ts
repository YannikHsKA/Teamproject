import {Component} from '@angular/core';
import {VerificationService} from "../../services/verification.service";
import {User} from "../../model/User.js";
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'verifications',
  templateUrl: `verifications.component.html`,
  styleUrls: ['verifications.component.css']
})
export class VerificationsComponent {
  user: User = new User();
  phonenumber: string;
  email_address: string;
  verCode: number;
  verifyPhone: boolean;
  verifyMail: boolean;
  displayVer: boolean;
  displayAlert: boolean;
  displayAlert2: boolean;
  disPhoneButton: boolean;
  disMailButton: boolean;

  constructor(private verificationService: VerificationService, private router: Router) {
    this.displayVer = true;
    this.disPhoneButton = true;
    this.disMailButton = true;

    document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = "none";
  }

  checkUserByPhone() {

    this.verificationService.getUserByNumber(this.phonenumber)
      .subscribe(data => {
          if (data) {
            this.user.id = data.id;
            this.user.setting_key = data.setting_key;
            this.user.whatsapp = data.whatsapp;
            this.user.email = data.email;
            this.user.email_address = data.email_address;
            this.user.sms = data.sms;
            this.user.phonenumber = data.phonenumber;
            this.displayVer = false;
          }
        },
        err => {
          console.log("User" + this.phonenumber + "not found")
          this.displayAlert = true;
        });
  }

  checkUserByMail() {
    this.verificationService.getUserByMail(this.email_address)
      .subscribe(data => {
          console.log(data);
          if (data) {
            this.user.id = data.id;
            this.user.setting_key = data.setting_key;
            this.user.whatsapp = data.whatsapp;
            this.user.email = data.email;
            this.user.email_address = data.email_address;
            this.user.sms = data.sms;
            this.user.phonenumber = data.phonenumber;
            this.displayVer = false;
          }
        },
        err => {
          console.log("User" + this.email_address + "not found")
          this.displayAlert = true;
        });
  }


  checkVerification() {
    if (this.verCode == this.user.setting_key) {
      this.verificationService.user = this.user;
      this.router.navigate(['./settings']);
    } else {
      this.displayAlert2 = true;
    }
  }

  showPhoneVer() {
    if (!this.verifyPhone && this.verifyMail) {
      this.verifyPhone = true;
      this.verifyMail = false;
    } else if(!this.verifyPhone){
      this.verifyPhone = true;
    } else {
      this.verifyPhone = false;
    }
  }

  showMailVer() {
    if (!this.verifyMail && this.verifyPhone) {
      this.verifyMail = true;
      this.verifyPhone = false;
    } else if(!this.verifyMail){
      this.verifyMail = true;
    } else {
      this.verifyMail = false;
    }
  }

}
