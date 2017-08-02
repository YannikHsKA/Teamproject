import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../model/User";

@Injectable()
export class VerificationService {

  user: User;

  constructor(private http: Http) {
    console.log('Verification Service initialized..');
  }


  getUserByNumber(phonenumber: string) {
    return this.http.get('/api/user/phone/' + phonenumber)
      .map(res => res.json());
  }

  getUserByMail(email_address: string){

    return this.http.get('/api/user/mail/' + email_address)
      .map(res => res.json());
  }

}
