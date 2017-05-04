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
var subscription_service_1 = require('../../services/subscription.service');
var SubscriptionsComponent = (function () {
    function SubscriptionsComponent(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    SubscriptionsComponent.prototype.addUser = function (event) {
        var _this = this;
        event.preventDefault();
        var newUser = {
            phonenumber: this.phonenumber,
            sms: 1,
            whatsapp: 0
        };
        this.subscriptionService.addUser(newUser)
            .subscribe(function (user) {
            _this.users.push(user);
        });
    };
    SubscriptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'subscriptions',
            templateUrl: "subscriptions.component.html"
        }), 
        __metadata('design:paramtypes', [subscription_service_1.SubscriptionService])
    ], SubscriptionsComponent);
    return SubscriptionsComponent;
}());
exports.SubscriptionsComponent = SubscriptionsComponent;
//# sourceMappingURL=subscriptions.component.js.map