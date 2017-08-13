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
var EventbundleComponent = (function () {
    function EventbundleComponent(storage, router) {
        this.storage = storage;
        this.router = router;
        var event = this.storage.retrieve('event');
        this.bundle_id = this.storage.retrieve('bundle_id');
        this.event = event;
        this.bundle = this.event.bundles[this.bundle_id];
        if (this.bundle_id == 0) {
            this.bundle1_active = true;
        }
        else {
            this.bundle1_active = false;
        }
    }
    EventbundleComponent.prototype.backToEvent = function () {
        this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
        //Save in Storage
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
    };
    EventbundleComponent.prototype.backToBundle1 = function () {
        this.storage.store('event', this.event);
        this.bundle_id = 0;
        this.storage.store('bundle_id', this.bundle_id);
        this.bundle1_active = true;
    };
    EventbundleComponent.prototype.GoToArticles = function () {
        this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
        //Save in Storage
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
    };
    EventbundleComponent.prototype.save = function () {
        // this.event.bundles[this.bundle_id] = this.bundle;
        //Save in Storage
        if (this.bundle_id == 0) {
            this.bundle_id = 1;
            this.bundle1_active = false;
            this.storage.store('event', this.event);
            this.storage.store('bundle_id', this.bundle_id);
            this.router.navigate(['./eventbundle']);
        }
        else {
            this.storage.store('event', this.event);
            this.storage.store('bundle_id', this.bundle_id);
            this.router.navigate(['./notificationcenter']);
        }
    };
    EventbundleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'eventbundle',
            templateUrl: "eventbundle.component.html",
            styleUrls: ["eventbundle.component.css"]
        }), 
        __metadata('design:paramtypes', [ng2_webstorage_1.SessionStorageService, router_1.Router])
    ], EventbundleComponent);
    return EventbundleComponent;
}());
exports.EventbundleComponent = EventbundleComponent;
//# sourceMappingURL=eventbundle.component.js.map