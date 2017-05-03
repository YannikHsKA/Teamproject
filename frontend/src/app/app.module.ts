import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { BundlesComponent } from './components/bundles/bundles.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';

const appRoutes: Routes = [
  {path:'subscribe', component: SubscriptionsComponent},
  {path:'settings', component: ConfigurationsComponent}, //TODO: add :id for tel nr
  {path:'bundles', component: BundlesComponent} //TODO: add :id for tel nr
]

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, BundlesComponent, ConfigurationsComponent, SubscriptionsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
