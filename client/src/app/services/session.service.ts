import {Injectable} from '@angular/core';
import {SessionStorage} from "angular2-localstorage/WebStorage";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Bundle} from "../model/Bundle";
import {Article} from "../model/Article";

@Injectable()
export class SessionService {

  @SessionStorage() private _resultObj: any;
  @SessionStorage() private _events: Event[];
  @SessionStorage() private _bundles: Bundle[];
  @SessionStorage() private _articles: Article[];

  constructor(private http: Http) {
    console.log('Session Service Initialized...');
    this.clear();
  }

  private _dummyObj = {
    events: {
      title: "",
      start: "",
      end: "",
      bundles: [{
        title: "",
        description: "",
        picture: "",
        bundleId: "",
        articles: [{
          title: "",
          description: "",
          price: "",
          picture: ""
        }
        ]
      }
      ]
    }
  };

  getResultObj() {
    return  this._dummyObj;
  }

  setResultObj(value: any) {
    this._resultObj = value;
  }


  geBundles(): Bundle[] {
    return this._bundles;
  }

  setBundles(value: Bundle[]) {
    this._bundles = value;
  }


  getEvents(): Event[] {
    return this._events;
  }

  setEvents(value: Event[]) {
    this._events = value;
  }

  getArticles(): Article[] {
    return this._articles;
  }

  setArticles(value: Article[]) {
    this._articles = value;
  }

  clear() {
    this.setResultObj(null);
    this.setEvents(null);
    this.setBundles(null);
    this.setArticles(null);
  }

}
