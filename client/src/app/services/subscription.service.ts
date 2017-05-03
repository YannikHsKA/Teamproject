import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SubscriptionService{
  constructor(private http:Http){
    console.log('Subscription Service initialized..');
  }
}
