import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'settings',
  templateUrl: `settings.component.html`
})
export class SettingsComponent  {
  value : boolean= false;
  Existing(){
    this.value = !this.value;
  }
}
