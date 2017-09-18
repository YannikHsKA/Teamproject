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
var http_1 = require('@angular/http');
var event_service_1 = require('../../services/event.service');
var notification_service_1 = require('../../services/notification.service');
var ng2_webstorage_1 = require('ng2-webstorage');
var router_1 = require('@angular/router');
var Notification_1 = require("../../model/Notification");
var NotificationcenterComponent = (function () {
    function NotificationcenterComponent(notificationService, http, eventService, storage, router) {
        var _this = this;
        this.notificationService = notificationService;
        this.eventService = eventService;
        this.storage = storage;
        this.router = router;
        this.event = this.storage.retrieve('event');
        this.email_active = false;
        this.sms_active = true;
        this.whatsapp_active = false;
        this.amazon_active = false;
        //Set NavigationBar Attributes
        this.detail_status = this.storage.retrieve('detail');
        this.bundle1_status = this.storage.retrieve('bundle1_status');
        this.select_status = this.storage.retrieve('select_status');
        this.notification_status = true;
        this.active_status = "notification";
        this.notification = new Notification_1.Notification();
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        if (this.event.notifications) {
            this.notifications = [];
            Object.keys(this.event.notifications).forEach(function (key) {
                console.log(_this.event.notifications[key]); //value
                console.log(key); //key
                _this.notifications.push(_this.event.notifications[key]);
            });
        }
        console.log("BUNDLEID", this.notifications);
    }
    NotificationcenterComponent.prototype.switchLane = function (btn) {
        switch (btn) {
            case "whatsapp":
                this.whatsapp_active = true;
                this.sms_active = false;
                this.email_active = false;
                this.amazon_active = false;
                break;
            case "sms":
                this.email_active = false;
                this.sms_active = true;
                this.whatsapp_active = false;
                this.amazon_active = false;
                break;
            case "email":
                this.email_active = true;
                this.sms_active = false;
                this.whatsapp_active = false;
                this.amazon_active = false;
                break;
            case "amazon":
                this.amazon_active = true;
                this.email_active = false;
                this.sms_active = false;
                this.whatsapp_active = false;
        }
    };
    NotificationcenterComponent.prototype.ngOnDestroy = function () {
        document.body.style.backgroundImage = "none";
    };
    NotificationcenterComponent.prototype.addNotification = function () {
        var _this = this;
        var newNotification = new Notification_1.Notification();
        if (!this.notification.whatsapp_text) {
            newNotification.whatsapp_text = "no Text";
        }
        else {
            console.log("Whatsapp Text vorhanden");
            newNotification.whatsapp_text = this.notification.whatsapp_text;
            this.notificationService.sendWhatsapp(this.notification);
        }
        if (this.notification.sms_text) {
            newNotification.sms_text = this.notification.sms_text;
            console.log("SMS Text vorhanden");
            this.notificationService.sendSMS(this.notification);
        }
        else {
            newNotification.sms_text = "no Text";
        }
        if (this.notification.email_text) {
            newNotification.email_text = this.notification.email_text;
            console.log("Email Text vorhanden");
            this.notificationService.sendEmail(this.notification);
        }
        else {
            newNotification.email_text = "no Text";
        }
        newNotification.time = new Date();
        newNotification.whatsapp_receiver = 2;
        newNotification.id = "0";
        var eventid = this.event.id;
        var temp = "";
        this.eventService.addNotification(newNotification, eventid)
            .subscribe(function (result) { return temp; });
        console.log("create Notification", temp);
        if (this.event.notifications) {
            this.notifications = [];
            Object.keys(this.event.notifications).forEach(function (key) {
                //console.log(this.event.notifications[key]); //value
                // console.log(key); //key
                _this.notifications.push(_this.event.notifications[key]);
            });
        }
        this.notifications = [];
        this.notifications.push(newNotification);
        this.storage.store('bundle_id', this.bundle_id);
        this.storage.store('event', event);
        this.storage.store('mode', 'edit');
    };
    NotificationcenterComponent.prototype.backToBundle2 = function () {
        this.bundle_id = 0;
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
        this.router.navigate(['./eventbundle']);
    };
    NotificationcenterComponent.prototype.onResend = function (event) {
        console.log("Reopen Message");
    };
    NotificationcenterComponent.prototype.hack = function (val) {
        return Array.from(val);
    };
    NotificationcenterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notificationcenter',
            templateUrl: "notificationcenter.component.html",
            styleUrls: ['notificationcenter.component.css']
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationService, http_1.Http, event_service_1.EventService, ng2_webstorage_1.SessionStorageService, router_1.Router])
    ], NotificationcenterComponent);
    return NotificationcenterComponent;
}());
exports.NotificationcenterComponent = NotificationcenterComponent;
//# sourceMappingURL=notificationcenter.component.js.map