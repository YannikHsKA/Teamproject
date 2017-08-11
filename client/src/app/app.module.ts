import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { BundlesComponent } from './components/bundles/bundles.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { VerificationsComponent } from './components/verifications/verifications.component';
import { DetailedbundleComponent } from './components/detailedbundle/detailedbundle.component';
import {EventdetailComponent} from "./components/eventcenter/eventdetail/eventdetail.component";
import {EventoverviewComponent} from "./components/eventcenter/eventoverview/eventoverview.component";
import {EventbundleComponent} from "./components/eventcenter/eventbundle/eventbundle.component";
import {NotificationcenterComponent} from "./components/notificationcenter/notificationcenter.component";
import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";



const appRoutes: Routes = [
  {path:'subscribe', component: SubscriptionsComponent},
  {path:'verification', component: VerificationsComponent},
  {path:'settings', component: SettingsComponent},
  {path:'bundles', component: BundlesComponent},
  {path:'eventdetail', component: EventdetailComponent},
  {path:'eventoverview', component: EventoverviewComponent},
  {path:'eventbundle', component: EventbundleComponent},
  {path:'detailedbundle', component: DetailedbundleComponent}, //TODO: introduce bundle ID as parameter
  {path:'notificationcenter', component: NotificationcenterComponent},
  {path: '404', component: NotFoundComponent},
  {path: '', redirectTo: '/subscribe', pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
]

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, BundlesComponent, NotificationcenterComponent, EventoverviewComponent, EventdetailComponent,EventbundleComponent, SettingsComponent, SubscriptionsComponent, NotFoundComponent, VerificationsComponent, DetailedbundleComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ LocalStorageService ]
})
export class AppModule { }
