import { Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import { SessionStorageService} from 'ng2-webstorage';

@Component({
  moduleId: module.id,
  selector: 'bundles',
  templateUrl: `bundles.component.html`,
  styleUrls: [`bundles.component.css`]
})
export class BundlesComponent {
constructor(private  storage: SessionStorageService, private router: Router){
  document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";

}

gotoBundle1(){
  this.storage.store('bundle_id', 0);
  this.router.navigate(['/detailedbundle']);
}

gotoBundle2(){
  this.storage.store('bundle_id', 1);
  this.router.navigate(['/detailedbundle']);
}



ngOnDestroy(){
  document.body.style.backgroundImage = "none";
}
}
