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
var router_1 = require("@angular/router");
var ng2_webstorage_1 = require('ng2-webstorage');
var http_1 = require('@angular/http');
var event_service_1 = require("../../services/event.service");
var DetailedbundleComponent = (function () {
    function DetailedbundleComponent(activatedRoute, storage, http, eventService) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.storage = storage;
        this.http = http;
        this.eventService = eventService;
        this.eventService.getCurrentEvent()
            .subscribe(function (events) {
            _this.events = events;
            _this.bundles = _this.events[0].bundles;
            if (_this.bundles[0].theme == 1) {
                document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
            }
            else if (_this.bundles[0].theme == 2) {
                document.body.style.backgroundImage = "url('src/assets/sportbackground.jpg')";
            }
            else {
                document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
            }
            document.body.style.backgroundPosition = "center center";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundSize = "cover";
        });
        this.bundle_id = this.storage.retrieve('bundle_id');
        console.log(this.bundle_id);
    }
    DetailedbundleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'detailedbundle',
            templateUrl: "detailedbundle.component.html",
            styleUrls: ["detailedbundle.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, ng2_webstorage_1.SessionStorageService, http_1.Http, event_service_1.EventService])
    ], DetailedbundleComponent);
    return DetailedbundleComponent;
}());
exports.DetailedbundleComponent = DetailedbundleComponent;
//# sourceMappingURL=detailedbundle.component.js.map