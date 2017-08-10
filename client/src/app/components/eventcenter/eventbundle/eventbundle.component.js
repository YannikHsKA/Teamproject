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
var event_service_1 = require("../../../services/event.service");
var Bundle_1 = require("../../../model/Bundle");
var bundle_service_1 = require("../../../services/bundle.service");
var EventbundleComponent = (function () {
    function EventbundleComponent(eventService, bundleService) {
        this.eventService = eventService;
        this.bundleService = bundleService;
        this.event = this.eventService.event;
        this.bundle = this.eventService.bundle;
        console.log(this.event);
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    }
    EventbundleComponent.prototype.addBundle = function () {
        event.preventDefault();
        var newBundle = new Bundle_1.Bundle();
        newBundle.title = this.bundle.title;
        newBundle.description = this.bundle.description;
        newBundle.picture = this.bundle.picture;
        newBundle.bundleId = this.bundle.bundleId;
        this.bundleService.addBundle(newBundle, this.event.id)
            .subscribe();
    };
    __decorate([
        core_1.ViewChild('quote-carousel'), 
        __metadata('design:type', core_1.ElementRef)
    ], EventbundleComponent.prototype, "carousel", void 0);
    EventbundleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'eventbundle',
            templateUrl: "eventbundle.component.html",
            styleUrls: ["eventbundle.component.css"]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, bundle_service_1.BundleService])
    ], EventbundleComponent);
    return EventbundleComponent;
}());
exports.EventbundleComponent = EventbundleComponent;
//# sourceMappingURL=eventbundle.component.js.map