import {Component} from '@angular/core';
import {SessionStorageService} from 'ng2-webstorage';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";
import {Router} from '@angular/router';
import {EventService} from "../../../services/event.service";
import {BundleService} from "../../../services/bundle.service";


@Component({
  moduleId: module.id,
  selector: 'eventbundleselection',
  templateUrl: `eventbundleselection.component.html`,
  styleUrls: [`eventbundleselection.component.css`]
})
export class EventbundleselectionComponent {

  event: Event;
  bundle: Bundle;
  bundles: Bundle[] = new Array();
  bundle_id: number;
  bundle1_active: boolean;
  bundle_id_text: string;
  detail_status: boolean;
  bundle1_status: boolean;
  select_status: boolean;
  notification_status: boolean;
  active_status: string;

  constructor(private eventService: EventService, private storage: SessionStorageService, private router: Router, private bundleService: BundleService) {
    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";

    this.bundle_id = this.storage.retrieve('bundle_id');
    this.event = this.storage.retrieve('event');
    this.bundle = this.event.bundles[this.bundle_id];

    //Set NavigationBar Attributes
    this.detail_status = this.storage.retrieve('detail_status');
    this.bundle1_status = this.storage.retrieve('bundle1_status');
    this.select_status = this.storage.retrieve('select_status');
    this.notification_status = this.storage.retrieve('notification_status');


    this.active_status = "select";
    this.select_status = true;
    this.storage.store('select_status', true);

    var cweek = this.event.cweek.split("W");

    this.bundleService.getBundlesByCweek(cweek[1])
      .subscribe(bundles => {
        this.bundles = bundles;
        var num = 1;
        for (let bundle of bundles) {
          bundle.title = "Bundle " + num;
          num++;
        }
      });

    if(this.storage.retrieve('article')){
      var article = storage.retrieve('article');

      this.bundleService.getBundlesByCweekAndArticle(cweek[1], article)
        .subscribe(bundles => {
          this.bundles = bundles;
          var num = 1;
          for (let bundle of bundles) {
            bundle.title = "Bundle " + num;
            num++;
          }
        });
    }


  }

  goToEventBundle(bundle: Bundle) {
    this.storage.store('bundle', bundle);
    this.router.navigate(["/eventbundle"]);
  }

  backToEvent() {
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', this.bundle_id);
  }
  backToBundle1() {
    this.storage.store('event', this.event);
    this.bundle_id_text = "First";
    this.bundle = this.event.bundles[0];
    this.storage.store('bundle_id', 0);
    this.bundle_id = 0;
    this.bundle1_active = true;
    this.active_status = "bundle1";
  }
  GoToArticles() {
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', this.bundle_id);
    this.storage.store('active_status', this.active_status);
  }
}