import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ng2-webstorage';
import {EventService} from "../../services/event.service";
import {Event} from "../../model/Event";
import {Bundle} from "../../model/Bundle";

@Component({
  moduleId: module.id,
  selector: 'bundles',
  templateUrl: `bundles.component.html`,
  styleUrls: [`bundles.component.css`]
})
export class BundlesComponent{
  events: Event[];
  event: Event;
  title: String;
  bundles: Bundle[];
  bundlebackground: String;

  constructor(private  storage: SessionStorageService, private router: Router, private eventService: EventService) {
    this.eventService.getCurrentEvent()
      .subscribe(events => {
        this.events = events;
        this.bundles = this.events[0].bundles;
        
        if(this.bundles[0].theme == 1){
          document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
          this.bundlebackground = "kekse.jpg";
        } else if(this.bundles[0].theme == 2){
          document.body.style.backgroundImage = "url('src/assets/sportbackground.jpg')";
          this.bundlebackground = "superbowlsnacks.jpg";
        } else {
          document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
          this.bundlebackground = "Angebote.jpg";
        }

        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";

      });
  }


  gotoBundle() {
    this.storage.store('bundle_id', 0);
    this.router.navigate(['/detailedbundle']);
  }


  ngOnDestroy() {
    document.body.style.backgroundImage = "none";
  }
}
