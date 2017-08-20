import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from './services/subscription.service';
import {VerificationService} from "./services/verification.service";
import {SettingsService} from "./services/settings.service";
import {EventService} from "./services/event.service";
import {NotificationService} from "./services/notification.service";
import {BundleService} from "./services/bundle.service";
import {TranslateService, TranslatePipe} from 'ng2-translate';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'consumerAnalytics',
  templateUrl: `app.component.html`,
  providers: [NotificationService,SubscriptionService, VerificationService, SettingsService, EventService, BundleService]
})
export class AppComponent implements OnInit{

  public supportedLanguages: any[];
  public translatedText: string;
  pageTitle: string = "Consumer Analytics Services"

  constructor(private translate: TranslateService, private router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');
}
ngOnInit() {
  // standing data
  this.supportedLanguages = [
    { display: 'English', value: 'en' },
    { display: 'Deutsch', value: 'de' },
    { display: '华语', value: 'zh' },
  ];

  this.selectLang('en');
}
isCurrentLang(lang: string) {
     return lang === this.translate.currentLang;
   }

   selectLang(lang: string) {
     // set default;
     this.translate.use(lang);

   }
   goTo(page:String)
   {
     this.router.navigate(["/"+page]);
   }

}
