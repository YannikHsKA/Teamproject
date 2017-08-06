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
var subscription_service_1 = require('./services/subscription.service');
var verification_service_1 = require("./services/verification.service");
var settings_service_1 = require("./services/settings.service");
var event_service_1 = require("./services/event.service");
var AppComponent = (function () {
    function AppComponent() {
        this.pageTitle = "Consumer Analytics Services";
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'consumerAnalytics',
            templateUrl: "app.component.html",
            providers: [subscription_service_1.SubscriptionService, verification_service_1.VerificationService, settings_service_1.SettingsService, event_service_1.EventService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map