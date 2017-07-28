import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'detailedbundle',
  templateUrl: `detailedbundle.component.html`,
  styleUrls: [`detailedbundle.component.css`]
})
export class DetailedbundleComponent  {
constructor(){
  document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";
}
}
