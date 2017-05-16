import { Component } from '@angular/core';
import {VerificationService} from "../../services/verification.service";

@Component({
  moduleId: module.id,
  selector: 'verifications',
  templateUrl: `verifications.component.html`
})
export class VerificationsComponent  {
  phonenumber: string;

  constructor(private verificationService:VerificationService){

  }

  checkVerification(){
    this.verificationService.getUserByNumber(this.phonenumber)
      .subscribe(data => {
        //TODO: catch error if user doesn't exist -> display alert in HTML, else: display verification field and check verification code with object
      })
  }

}
