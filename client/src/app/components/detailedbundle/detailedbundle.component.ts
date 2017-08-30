import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { SessionStorageService} from 'ng2-webstorage';
import {Http, Headers, Response} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'detailedbundle',
  templateUrl: `detailedbundle.component.html`,
  styleUrls: [`detailedbundle.component.css`]
})


export class DetailedbundleComponent  {

  bundle_id: string;

constructor(private activatedRoute: ActivatedRoute, private storage: SessionStorageService, private http : Http){
  document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";


  this.bundle_id = this.storage.retrieve('bundle_id');
  console.log(this.bundle_id);

  this.http.post('/api/createpdf',{responseType:'arraybuffer'})

    .subscribe(data => {
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      //window.open(fileURL);
    }, error => {
      console.log(JSON.stringify(error.json()));
    });

 // let content;
 // console.log("file URL" + fileURL);
 // content = $sce.trustAsResourceUrl(fileURL);


}



}
