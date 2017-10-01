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
var ng2_webstorage_1 = require('ng2-webstorage');
var EventoverviewComponent = (function () {
    function EventoverviewComponent(eventService, router, storage) {
        var _this = this;
        this.eventService = eventService;
        this.router = router;
        this.storage = storage;
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        this.eventService.getEvents()
            .subscribe(function (events) {
            _this.events = events;
        });
    }
    EventoverviewComponent.prototype.onCreate = function () {
        this.storage.clear();
        this.storage.store('mode', 'create');
        this.router.navigate(['./eventdetail']);
    };
    EventoverviewComponent.prototype.onPublish = function (event) {
        this.eventService.updateCurrentEvent(event);
        this.storage.clear();
        this.eventService.createPdf(event);
        this.storage.store('event', event);
        var that = this;
        function doBoth() {
            document.getElementById("closemodal").click();
            that.router.navigate(['./notificationcenter']);
        }
        setTimeout(doBoth, 5500);
    };
    EventoverviewComponent.prototype.onEdit = function (event) {
        this.storage.clear();
        this.storage.store('mode', 'edit');
        this.storage.store('bundle_id', 0);
        this.eventService.event = event;
        this.router.navigate(['./eventdetail']);
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
        __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router, ng2_webstorage_1.SessionStorageService])
    ], EventoverviewComponent);
    return EventoverviewComponent;
}());
exports.EventoverviewComponent = EventoverviewComponent;
//# sourceMappingURL=eventoverview.component.js.map