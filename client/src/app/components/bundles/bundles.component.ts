import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bundles',
  templateUrl: `bundles.component.html`,
  styleUrls: [`bundles.component.css`]
})
export class BundlesComponent  {
constructor(){
  document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";
}

ngOnDestroy(){
  document.body.style.backgroundImage = "none";
}
}
