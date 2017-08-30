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
var ng2_webstorage_1 = require('ng2-webstorage');
var router_1 = require('@angular/router');
var event_service_1 = require("../../../services/event.service");
var EventbundleComponent = (function () {
    function EventbundleComponent(eventService, storage, router) {
        this.eventService = eventService;
        this.storage = storage;
        this.router = router;
        this.articles = new Array();
        this.discounts = new Array();
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        this.bundle_id = this.storage.retrieve('bundle_id');
        this.event = this.storage.retrieve('event');
        this.bundle = this.event.bundles[this.bundle_id];
        this.chosen_bundle = this.storage.retrieve('bundle');
        for (var i = 0; i < 3; i++) {
            this.discounts[i] = this.chosen_bundle.articles[i].preis;
        }
        //Set NavigationBar Attributes
        this.detail_status = this.storage.retrieve('detail_status');
        this.bundle1_status = this.storage.retrieve('bundle1_status');
        this.bundle2_status = this.storage.retrieve('bundle2_status');
        this.notification_status = this.storage.retrieve('notification_status');
        switch (this.bundle_id) {
            case 0:
                this.active_status = "bundle1";
                this.bundle_id_text = "First";
                this.bundle1_active = true;
                this.bundle1_status = true;
                this.storage.store('bundle1_status', true);
                break;
            case 1:
                this.active_status = "bundle2";
                this.bundle_id_text = "Second";
                this.bundle2_status = true;
                this.storage.store('bundle2_status', true);
                break;
        }
    }
    EventbundleComponent.prototype.backToEvent = function () {
        this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
    };
    EventbundleComponent.prototype.GoNext = function () {
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
        this.storage.store('bundle2_status', true);
        this.router.navigate(['./notificationcenter']);
        this.eventService.updateEvent(this.storage.retrieve('event'))
            .subscribe();
    };
    EventbundleComponent.prototype.handleChange = function (num) {
        for (var i = 0; i < 3; i++) {
            var res = this.chosen_bundle.articles[i].preis.split("€");
            this.discounts[i] = (parseFloat(res[0]) * num).toFixed(2).toString().concat("€");
        }
    };
    EventbundleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'eventbundle',
            templateUrl: "eventbundle.component.html",
            styleUrls: ["eventbundle.component.css"]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, ng2_webstorage_1.SessionStorageService, router_1.Router])
    ], EventbundleComponent);
    return EventbundleComponent;
}());
exports.EventbundleComponent = EventbundleComponent;
//# sourceMappingURL=eventbundle.component.js.map