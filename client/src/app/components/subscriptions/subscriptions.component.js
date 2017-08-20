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
var User_js_1 = require('../../model/User.js');
var subscription_service_1 = require('../../services/subscription.service');
var SubscriptionsComponent = (function () {
    function SubscriptionsComponent(subscriptionService) {
        this.subscriptionService = subscriptionService;
        this.registerPhone = false;
        this.registerMail = false;
        this.registerWhatsapp = false;
        document.body.style.backgroundImage = "url('src/assets/bg.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
    }
    SubscriptionsComponent.prototype.ngOnDestroy = function () {
        document.body.style.backgroundImage = "none";
    };
    SubscriptionsComponent.prototype.addUser = function () {
        event.preventDefault();
        var newUser = new User_js_1.User();
        newUser.phonenumber = this.phonenumber;
        newUser.email_address = this.email_address;
        if (this.phonenumber) {
            newUser.phonenumber = this.phonenumber;
            this.saveSuccess = true;
            newUser.sms = 1;
        }
        if (newUser.email_address) {
            this.saveSuccess = true;
            newUser.email = 1;
        }
        if (this.whatsapp_number) {
            newUser.phonenumber = this.whatsapp_number;
            this.saveSuccess = true;
            newUser.whatsapp = 1;
        }
        this.subscriptionService.addUser(newUser)
            .subscribe();
    };
    SubscriptionsComponent.prototype.showPhoneFields = function () {
        this.email_address = null;
        this.saveSuccess = false;
        if (!this.registerPhone && this.registerMail) {
            this.registerPhone = true;
            this.registerWhatsapp = false;
            this.registerMail = false;
        }
        else if (!this.registerPhone) {
            this.registerPhone = true;
        }
        else {
            this.registerPhone = false;
        }
    };
    SubscriptionsComponent.prototype.showWhatsappFields = function () {
        this.saveSuccess = false;
        this.registerWhatsapp = true;
        this.registerMail = false;
        this.registerPhone = false;
    };
    SubscriptionsComponent.prototype.showMailFields = function () {
        this.phonenumber = null;
        this.saveSuccess = false;
        this.registerMail = true;
        this.registerWhatsapp = false;
        this.registerPhone = false;
    };
    SubscriptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'subscriptions',
            templateUrl: "subscriptions.component.html",
            styleUrls: ['subscriptions.component.css']
        }), 
        __metadata('design:paramtypes', [subscription_service_1.SubscriptionService])
    ], SubscriptionsComponent);
    return SubscriptionsComponent;
}());
exports.SubscriptionsComponent = SubscriptionsComponent;
//# sourceMappingURL=subscriptions.component.js.map