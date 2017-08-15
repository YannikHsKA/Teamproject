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
var event_service_1 = require('../../services/event.service');
var ng2_webstorage_1 = require('ng2-webstorage');
var router_1 = require('@angular/router');
var NotificationcenterComponent = (function () {
    function NotificationcenterComponent(eventService, storage, router) {
        this.eventService = eventService;
        this.storage = storage;
        this.router = router;
        this.event = eventService.getEvent();
        this.email_active = false;
        this.sms_active = true;
        this.whatsapp_active = false;
        //Set NavigationBar Attributes
        this.detail_status = this.storage.retrieve('detail');
        this.bundle1_status = this.storage.retrieve('bundle1_status');
        this.bundle2_status = this.storage.retrieve('bundle2_status');
        this.notification_status = true;
        this.active_status = "notification";
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
    }
    NotificationcenterComponent.prototype.switchLane = function (btn) {
        switch (btn) {
            case "whatsapp":
                this.whatsapp_active = true;
                this.sms_active = false;
                this.email_active = false;
                break;
            case "sms":
                this.email_active = false;
                this.sms_active = true;
                this.whatsapp_active = false;
                break;
            case "email":
                this.email_active = true;
                this.sms_active = false;
                this.whatsapp_active = false;
                break;
        }
    };
    NotificationcenterComponent.prototype.ngOnDestroy = function () {
        document.body.style.backgroundImage = "none";
    };
    NotificationcenterComponent.prototype.backToBundle2 = function () {
        this.bundle_id = 1;
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
        this.router.navigate(['./eventbundle']);
    };
    NotificationcenterComponent.prototype.saveNotification = function () {
        console.log("Send out messages");
    };
    NotificationcenterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notificationcenter',
            templateUrl: "notificationcenter.component.html",
            styleUrls: ['notificationcenter.component.css']
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, ng2_webstorage_1.SessionStorageService, router_1.Router])
    ], NotificationcenterComponent);
    return NotificationcenterComponent;
}());
exports.NotificationcenterComponent = NotificationcenterComponent;
//# sourceMappingURL=notificationcenter.component.js.map