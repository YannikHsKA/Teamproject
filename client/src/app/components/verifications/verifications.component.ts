import { Component } from '@angular/core';
import {VerificationService} from "../../services/verification.service";
import {User} from "../../../../Users";

@Component({
  moduleId: module.id,
  selector: 'verifications',
  templateUrl: `verifications.component.html`
})
export class VerificationsComponent  {
  user: User;
  phonenumber: string;
  verCode: number;

  constructor(private verificationService:VerificationService){

  }

  checkUser(){
    console.log(this.phonenumber);
    /*
    this.verificationService.getUserByNumber(this.phonenumber)
      .subscribe(data => {
        console.log(data);
        if(data){
          this.user = data;
          //TODO: display verification field
        }else{
          //TODO: display Alert that user doesn't exist
        }
      },
      err => {
        console.log(err);
      });*/
  }

  checkVerification(){
    consoloe.log(this.verCode);
    console.log(this.user);
    if(this.verCode == this.user.settingkey) {
      //TODO: routing to personalized settings page (with telephonenumber in URL)
    }
  }

}
