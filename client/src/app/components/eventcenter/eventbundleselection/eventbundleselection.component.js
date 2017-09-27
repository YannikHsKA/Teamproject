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
var bundle_service_1 = require("../../../services/bundle.service");
var EventbundleselectionComponent = (function () {
    function EventbundleselectionComponent(eventService, storage, router, bundleService) {
        var _this = this;
        this.eventService = eventService;
        this.storage = storage;
        this.router = router;
        this.bundleService = bundleService;
        this.bundles = new Array();
        document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        this.bundle_id = this.storage.retrieve('bundle_id');
        this.event = this.storage.retrieve('event');
        this.bundle = this.event.bundles[this.bundle_id];
        //Set NavigationBar Attributes
        this.detail_status = this.storage.retrieve('detail_status');
        this.bundle1_status = this.storage.retrieve('bundle1_status');
        this.select_status = this.storage.retrieve('select_status');
        this.active_status = "select";
        this.select_status = true;
        this.storage.store('select_status', true);
        var cweek = this.event.cweek.split("W");
        this.bundleService.getBundlesByCweek(cweek[1])
            .subscribe(function (bundles) {
            _this.bundles = bundles;
            var num = 1;
            for (var _i = 0, bundles_1 = bundles; _i < bundles_1.length; _i++) {
                var bundle = bundles_1[_i];
                bundle.title = "Bundle " + num;
                num++;
            }
        });
        if (this.storage.retrieve('article')) {
            var article = storage.retrieve('article');
            var ean = article.ean;
            this.bundleService.getBundlesByCweekAndArticle(cweek[1], ean)
                .subscribe(function (bundles) {
                _this.bundles = bundles;
                var num = 1;
                for (var _i = 0, bundles_2 = bundles; _i < bundles_2.length; _i++) {
                    var bundle = bundles_2[_i];
                    bundle.title = "Bundle " + num;
                    num++;
                }
            });
        }
    }
    EventbundleselectionComponent.prototype.goToEventBundle = function (bundle) {
        this.storage.store('bundle', bundle);
        this.router.navigate(["/eventbundle"]);
    };
    EventbundleselectionComponent.prototype.backToEvent = function () {
        this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', this.bundle_id);
    };
    EventbundleselectionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'eventbundleselection',
            templateUrl: "eventbundleselection.component.html",
            styleUrls: ["eventbundleselection.component.css"]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, ng2_webstorage_1.SessionStorageService, router_1.Router, bundle_service_1.BundleService])
    ], EventbundleselectionComponent);
    return EventbundleselectionComponent;
}());
exports.EventbundleselectionComponent = EventbundleselectionComponent;
//# sourceMappingURL=eventbundleselection.component.js.map