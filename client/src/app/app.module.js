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
var configurations_component_1 = require('./components/configurations/configurations.component');
var subscriptions_component_1 = require('./components/subscriptions/subscriptions.component');
var appRoutes = [
    { path: '', component: subscriptions_component_1.SubscriptionsComponent },
    { path: 'settings', component: configurations_component_1.ConfigurationsComponent },
    { path: 'bundles', component: bundles_component_1.BundlesComponent } //TODO: add :id for tel nr
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes)],
            declarations: [app_component_1.AppComponent, bundles_component_1.BundlesComponent, configurations_component_1.ConfigurationsComponent, subscriptions_component_1.SubscriptionsComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map