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
        this.discounts = new Array();
        this.type = 1;
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        //Set NavigationBar Attributes
        this.active_status = "bundle1";
        this.bundle1_active = true;
        this.bundle1_status = true;
        this.storage.store('bundle1_status', true);
        console.log("WORKING MODE: " + this.storage.retrieve("mode"));
        if (this.storage.retrieve("mode") == "edit") {
            this.event = this.storage.retrieve('event');
            this.chosen_bundle = this.event.bundles[0];
            this.bundle = this.chosen_bundle;
            this.themevalue = this.bundle.theme;
            switch (this.event.bundles[0].discount) {
                case 'none':
                    this.type = 2;
                    break;
                default:
                    this.type = 1;
                    break;
            }
        }
        else {
            this.themevalue = 1;
            this.bundle_id = this.storage.retrieve('bundle_id');
            this.event = this.storage.retrieve('event');
            this.bundle = this.event.bundles[this.bundle_id];
            this.chosen_bundle = this.storage.retrieve('bundle');
            this.event.bundles[0].discount = "none";
            this.event.bundles[0].articles = this.chosen_bundle.articles;
            for (var i = 0; i < 3; i++) {
                var res = this.chosen_bundle.articles[i].preis;
                this.event.bundles[0].articles[i].discount = "none";
                this.event.bundles[0].articles[i].discountpreis = this.event.bundles[0].articles[i].preis;
            }
        }
        this.handleChangePure(parseFloat(this.chosen_bundle.articles[0].preis.split("€")[0]) * 0.1);
    }
    EventbundleComponent.prototype.backToEvent = function () {
        //Navigate back to Event
        this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
        this.router.navigate(['./eventdetail']);
    };
    EventbundleComponent.prototype.saveEvent = function () {
        //Read current list of articles
        this.event.bundles[0].articles = this.chosen_bundle.articles;
        //Update or Create
        if (this.storage.retrieve("mode") == "edit")
            this.eventService.updateEvent(this.event).subscribe();
        else
            this.eventService.addEvent(this.event).subscribe();
        //Navigate to Overview
        this.router.navigate(['./eventoverview']);
    };
    EventbundleComponent.prototype.handleChangePure = function (num) {
        //handle change for pure bundling
        this.event.bundles[0].discount = num.toString();
        for (var i = 0; i < 3; i++) {
            var res = this.chosen_bundle.articles[i].preis.split("€");
            this.discounts[i] = (parseFloat(res[0]) * num).toFixed(2).toString().concat("€");
            this.event.bundles[0].articles[i].discount = num.toString();
            this.event.bundles[0].articles[i].discountpreis = this.discounts[i].toString();
        }
    };
    EventbundleComponent.prototype.handleChangeMixed = function (i, num) {
        //handle change for mixed bundling
        var res = this.chosen_bundle.articles[i].preis.split("€");
        this.discounts[i] = (parseFloat(res[0]) * num).toFixed(2).toString().concat("€");
        this.event.bundles[0].articles[i].discount = num.toString();
        this.event.bundles[0].articles[i].discountpreis = this.discounts[i].toString();
    };
    EventbundleComponent.prototype.handleBundleTypeChange = function (num) {
        //handle change between Pure and Mixed Bundling
        switch (num) {
            case 1:
                break;
            case 2:
                this.event.bundles[0].discount = "none";
                break;
        }
        this.type = num;
        for (var i = 0; i < 3; i++) {
            this.discounts[i] = (parseFloat(this.chosen_bundle.articles[i].preis.split("€")[0])).toString().concat("€");
        }
    };
    EventbundleComponent.prototype.handleThemeChange = function (num) {
        //handle change in Theme selection
        this.event = this.storage.retrieve('event');
        this.event.bundles[0].theme = num;
        this.storage.store('event', this.event);
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