"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var bundles_component_1 = require('./components/bundles/bundles.component');
var settings_component_1 = require('./components/settings/settings.component');
var subscriptions_component_1 = require('./components/subscriptions/subscriptions.component');
var notfound_component_1 = require('./components/notfound/notfound.component');
var verifications_component_1 = require('./components/verifications/verifications.component');
var detailedbundle_component_1 = require('./components/detailedbundle/detailedbundle.component');
var eventdetail_component_1 = require("./components/eventcenter/eventdetail/eventdetail.component");
var eventoverview_component_1 = require("./components/eventcenter/eventoverview/eventoverview.component");
var eventbundle_component_1 = require("./components/eventcenter/eventbundle/eventbundle.component");
var notificationcenter_component_1 = require("./components/notificationcenter/notificationcenter.component");
var eventbundleselection_component_1 = require("./components/eventcenter/eventbundleselection/eventbundleselection.component");
var ng2_translate_1 = require('ng2-translate');
var ng2_webstorage_1 = require('ng2-webstorage');
var angular2_datatable_1 = require('angular2-datatable');
var ng2_filter_pipe_1 = require('ng2-filter-pipe');
var appRoutes = [
    { path: 'subscribe', component: subscriptions_component_1.SubscriptionsComponent },
    { path: 'verification', component: verifications_component_1.VerificationsComponent },
    { path: 'settings', component: settings_component_1.SettingsComponent },
    { path: 'bundles', component: bundles_component_1.BundlesComponent },
    { path: 'eventdetail', component: eventdetail_component_1.EventdetailComponent },
    { path: 'eventoverview', component: eventoverview_component_1.EventoverviewComponent },
    { path: 'eventbundle', component: eventbundle_component_1.EventbundleComponent },
    { path: 'eventbundleselection', component: eventbundleselection_component_1.EventbundleselectionComponent },
    { path: 'detailedbundle', component: detailedbundle_component_1.DetailedbundleComponent },
    { path: 'notificationcenter', component: notificationcenter_component_1.NotificationcenterComponent },
    { path: '404', component: notfound_component_1.NotFoundComponent },
    { path: '', redirectTo: '/subscribe', pathMatch: 'full' },
    { path: '**', redirectTo: '404', pathMatch: 'full' }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes),
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'src/assets/i18n', '.json'); },
                    deps: [http_1.Http]
                }), ng2_webstorage_1.Ng2Webstorage, angular2_datatable_1.DataTableModule, ng2_filter_pipe_1.Ng2FilterPipeModule],
            declarations: [app_component_1.AppComponent, bundles_component_1.BundlesComponent, notificationcenter_component_1.NotificationcenterComponent, eventoverview_component_1.EventoverviewComponent, eventdetail_component_1.EventdetailComponent, eventbundle_component_1.EventbundleComponent, settings_component_1.SettingsComponent, subscriptions_component_1.SubscriptionsComponent, notfound_component_1.NotFoundComponent, verifications_component_1.VerificationsComponent, detailedbundle_component_1.DetailedbundleComponent, eventbundleselection_component_1.EventbundleselectionComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map