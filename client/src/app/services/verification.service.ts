import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../../../User";

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

}
