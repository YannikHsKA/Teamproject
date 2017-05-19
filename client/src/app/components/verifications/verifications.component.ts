import {Component} from '@angular/core';
import {VerificationService} from "../../services/verification.service";
import {User} from "../../../../Users";
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'verifications',
  templateUrl: `verifications.component.html`
})
export class VerificationsComponent {
  user: User;
  phonenumber: string;
  verCode: number;
  displayVer: boolean;
  displayAlert: boolean;
  displayAlert2: boolean;

  constructor(private verificationService: VerificationService, private router: Router) {
    this.displayVer = true;
    // this.user = new User()
    this.user = {
      phonenumber: "1",
      sms: 0,
      whatsapp: 0,
      setting_key: 0
    }


  }

  checkUser() {
    this.verificationService.getUserByNumber(this.phonenumber)
      .subscribe(data => {
          console.log(data);
          if (data) {


            this.user.setting_key = data.setting_key;
            this.user.whatsapp = data.Whatsapp;
            this.user.sms = data.SMS;
            this.user.phonenumber = this.phonenumber;
            this.displayVer = false;
          }
        },
        err => {
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

}
