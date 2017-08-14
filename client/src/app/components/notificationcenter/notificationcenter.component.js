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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_service_1 = require("../../services/event.service");
var ng2_webstorage_1 = require("ng2-webstorage");
var router_1 = require("@angular/router");
var Notification_1 = require("../../model/Notification");
var NotificationcenterComponent = (function () {
    function NotificationcenterComponent(eventService, storage, router) {
        var _this = this;
        this.eventService = eventService;
        this.storage = storage;
        this.router = router;
        //this.event = eventService.getEvent();
        this.event = this.storage.retrieve('event');
        this.email_active = false;
        this.sms_active = true;
        this.whatsapp_active = false;
        this.notification = new Notification_1.Notification();
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        /*
            this.notification = new Notification();
            this.notification.whatsapp_text= "WhatsApp, SMS, Email";
            this.notification.time= new Date();
            this.notification.sms_text= "12";
            this.notification.email_text ="12";
            this.notification.whatsapp_receiver= 12;
        
            this.notifications = [];
            this.notifications.push(this.notification);
            this.notifications.push(this.notification);
        
        */
        if (this.event.notifications) {
            this.notifications = [];
            Object.keys(this.event.notifications).forEach(function (key) {
                console.log(_this.event.notifications[key]); //value
                console.log(key); //key
                _this.notifications.push(_this.event.notifications[key]);
            });
        }
        /*
         this.event.notifications = Array.from(this.event.notifications);
            var arr = [];
            data.forEach(obj, function(value, key){
              arr.push(value);
            });
        
            */
        console.log("BUNDLEID", this.notifications);
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
    NotificationcenterComponent.prototype.addNotification = function () {
        var _this = this;
        var newNotification = new Notification_1.Notification();
        newNotification.whatsapp_text = this.notification.whatsapp_text;
        newNotification.sms_text = this.notification.sms_text;
        newNotification.email_text = this.notification.email_text;
        newNotification.time = new Date();
        newNotification.whatsapp_receiver = 132;
        newNotification.id = "1";
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
        this.bundle_id = 1;
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
        this.router.navigate(['./eventbundle']);
    };
    NotificationcenterComponent.prototype.onResend = function (event) {
        console.log("Reopen Message");
    };
    NotificationcenterComponent.prototype.saveNotification = function () {
        console.log("Send out messages");
        this.addNotification();
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
        __metadata("design:paramtypes", [event_service_1.EventService, ng2_webstorage_1.SessionStorageService, router_1.Router])
    ], NotificationcenterComponent);
    return NotificationcenterComponent;
}());
exports.NotificationcenterComponent = NotificationcenterComponent;
//# sourceMappingURL=notificationcenter.component.js.map