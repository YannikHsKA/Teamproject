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
var event_service_1 = require('../../../services/event.service');
var router_1 = require('@angular/router');
var EventoverviewComponent = (function () {
    function EventoverviewComponent(eventService, router) {
        var _this = this;
        this.eventService = eventService;
        this.router = router;
        this.eventService.getEvents()
            .subscribe(function (events) {
            _this.events = events;
        });
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
    }
    EventoverviewComponent.prototype.onCreate = function () {
        this.bundles = new Array();
        var bundle = {
            title: "Please edit the bundle",
            description: "descr of bundle 1",
            picture: "url"
        };
        this.bundles[0] = bundle;
        this.bundles[1] = bundle;
        this.event = {
            title: "",
            start: "",
            end: "",
            bundles: this.bundles
        };
        this.safebuttonclicked = true;
        this.eventService.safebuttonclicked = this.safebuttonclicked;
        this.eventService.event = this.event;
        this.router.navigate(['./eventdetail']);
    };
    EventoverviewComponent.prototype.onEdit = function (event) {
        this.eventService.event = event;
        this.router.navigate(['./eventdetail']);
    };
    EventoverviewComponent.prototype.onNotify = function (event) {
        this.eventService.event = event;
        this.router.navigate(['./notificationcenter']);
    };
    EventoverviewComponent.prototype.onDelete = function (event) {
        var events = this.events;
        this.eventService.deleteEvent(event)
            .subscribe((function (data) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].id == event.id) {
                    events.splice(i, 1);
                }
            }
        }));
    };
    EventoverviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'eventoverview',
            templateUrl: "eventoverview.component.html",
            styleUrls: ["eventoverview.component.css"]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router])
    ], EventoverviewComponent);
    return EventoverviewComponent;
}());
exports.EventoverviewComponent = EventoverviewComponent;
//# sourceMappingURL=eventoverview.component.js.map