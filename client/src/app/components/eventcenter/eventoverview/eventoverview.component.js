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
            console.log(_this.events);
        });
    }
    EventoverviewComponent.prototype.onCreate = function () {
        this.event = {
            title: "",
            start: "",
            end: ""
        };
        this.eventService.event = this.event;
        this.router.navigate(['./eventdetail']);
    };
    EventoverviewComponent.prototype.onEdit = function (event) {
        this.eventService.event = event;
        this.router.navigate(['./eventdetail']);
    };
    ;
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