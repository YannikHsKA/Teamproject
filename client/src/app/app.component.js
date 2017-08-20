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
var notification_service_1 = require("./services/notification.service");
var bundle_service_1 = require("./services/bundle.service");
var ng2_translate_1 = require('ng2-translate');
var router_1 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(translate, router) {
        this.translate = translate;
        this.router = router;
        this.pageTitle = "Consumer Analytics Services";
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('de');
    }
    AppComponent.prototype.ngOnInit = function () {
        // standing data
        this.supportedLanguages = [
            { display: 'English', value: 'en' },
            { display: 'Deutsch', value: 'de' },
            { display: '华语', value: 'zh' },
        ];
        this.selectLang('en');
    };
    AppComponent.prototype.isCurrentLang = function (lang) {
        return lang === this.translate.currentLang;
    };
    AppComponent.prototype.selectLang = function (lang) {
        // set default;
        this.translate.use(lang);
    };
    AppComponent.prototype.goTo = function (page) {
        this.router.navigate(["/" + page]);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'consumerAnalytics',
            templateUrl: "app.component.html",
            providers: [notification_service_1.NotificationService, subscription_service_1.SubscriptionService, verification_service_1.VerificationService, settings_service_1.SettingsService, event_service_1.EventService, bundle_service_1.BundleService]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map