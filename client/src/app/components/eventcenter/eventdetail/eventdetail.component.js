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
var Event_1 = require("../../../model/Event");
var event_service_1 = require("../../../services/event.service");
var EventdetailComponent = (function () {
    function EventdetailComponent(eventService) {
        this.eventService = eventService;
        this.event = this.eventService.event;
        if (this.event.title == "") {
            this.createMode = true;
        }
        else {
            this.createMode = false;
        }
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    }
    EventdetailComponent.prototype.addEvent = function () {
        event.preventDefault();
        var newEvent = new Event_1.Event();
        newEvent.title = this.event.title;
        newEvent.start = this.event.start;
        newEvent.end = this.event.end;
        this.eventService.addEvent(newEvent)
            .subscribe();
    };
    EventdetailComponent.prototype.updateEvent = function (event) {
        var _event = {
            title: event.title,
            start: event.start,
            end: event.end,
            id: event.id
        };
        this.eventService.updateEvent(_event)
            .subscribe();
    };
    EventdetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'eventdetail',
            templateUrl: "eventdetail.component.html",
            styleUrls: ["eventdetail.component.css"]
        }),
        __metadata("design:paramtypes", [event_service_1.EventService])
    ], EventdetailComponent);
    return EventdetailComponent;
}());
exports.EventdetailComponent = EventdetailComponent;
//# sourceMappingURL=eventdetail.component.js.map