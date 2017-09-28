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
var router_1 = require('@angular/router');
var ng2_webstorage_1 = require('ng2-webstorage');
var event_service_1 = require("../../services/event.service");
var BundlesComponent = (function () {
    function BundlesComponent(storage, router, eventService) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.eventService = eventService;
        this.eventService.getCurrentEvent()
            .subscribe(function (events) {
            _this.events = events;
            _this.bundles = _this.events[0].bundles;
            _this.title2 = "Verfügbare Bundles in der Kalenderwoche " + _this.events[0].cweek.substr(6, 2) + ", " + _this.events[0].cweek.substr(0, 4);
            if (_this.bundles[0].theme == 1) {
                document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
                _this.bundlebackground = "kekse.jpg";
                _this.title = "LIDL Christmas Special " + _this.events[0].title;
                _this.fontfamily = "'Fontdiner Swanky', cursive";
                _this.fontfamily2 = "'Bonbon', cursive";
                _this.fontcolor = "white";
            }
            else if (_this.bundles[0].theme == 2) {
                document.body.style.backgroundImage = "url('src/assets/sportbackground.jpg')";
                _this.bundlebackground = "superbowlsnacks.jpg";
                _this.title = "LIDL Sports Special " + _this.events[0].title;
                _this.fontfamily = "'Graduate', cursive";
                _this.fontfamily2 = "'Playball', cursive";
                _this.fontcolor = "red";
            }
            else {
                document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
                _this.bundlebackground = "Angebote.jpg";
                _this.title = "LIDL Smart Bundles " + _this.events[0].title;
                _this.fontfamily = "'Archivo Black', sans-serif";
                _this.fontfamily2 = "'Anaheim'";
                _this.fontcolor = "black";
            }
            document.body.style.backgroundPosition = "center center";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundSize = "cover";
        });
    }
    BundlesComponent.prototype.gotoBundle = function () {
        this.storage.store('bundle_id', 0);
        this.router.navigate(['/detailedbundle']);
    };
    BundlesComponent.prototype.ngOnDestroy = function () {
        document.body.style.backgroundImage = "none";
    };
    BundlesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bundles',
            templateUrl: "bundles.component.html",
            styleUrls: ["bundles.component.css"]
        }), 
        __metadata('design:paramtypes', [ng2_webstorage_1.SessionStorageService, router_1.Router, event_service_1.EventService])
    ], BundlesComponent);
    return BundlesComponent;
}());
exports.BundlesComponent = BundlesComponent;
//# sourceMappingURL=bundles.component.js.map