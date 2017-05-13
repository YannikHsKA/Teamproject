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

const appRoutes: Routes = [
  {path:'subscribe', component: SubscriptionsComponent},
  {path:'settings', component: SettingsComponent}, //TODO: add :id for tel nr
  {path:'bundles', component: BundlesComponent}, //TODO: add :id for tel nr
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
]

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, BundlesComponent, SettingsComponent, SubscriptionsComponent, NotFoundComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
