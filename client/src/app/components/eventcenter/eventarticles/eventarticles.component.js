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
var router_1 = require("@angular/router");
var ng2_webstorage_1 = require('ng2-webstorage');
var EventarticlesComponent = (function () {
    function EventarticlesComponent(eventService, router, storage) {
        this.eventService = eventService;
        this.router = router;
        this.storage = storage;
        this.articles = new Array();
        //load articles from database
        //if no articles - add default ones
        switch (this.storage.retrieve("bundle_id")) {
            case 0:
                this.bundle_id_text = "First";
                this.bundle1_active = true;
                break;
            case 1:
                this.bundle_id_text = "Second";
                this.bundle1_active = false;
                break;
        }
        if (this.storage.retrieve('event').bundles[this.storage.retrieve("bundle_id")].articles == null) {
            var n = 0;
            while (n < 3) {
                this.defaultarticle = {
                    ean: 815,
                    id: n,
                    title: "Article",
                    currency: "€",
                    price: "12,99",
                    picture: "...",
                };
                this.articles[n] = this.defaultarticle;
                n++;
            }
        }
        else {
            this.event = this.storage.retrieve('event');
            this.articles = this.event.bundles[this.storage.retrieve('bundle_id')].articles;
        }
    }
    EventarticlesComponent.prototype.back = function () {
        //back to Bundle
        //save entries
        this.event = this.storage.retrieve('event');
        this.event.bundles[this.storage.retrieve('bundle_id')].articles = this.articles;
        this.storage.store('event', this.event);
    };
    EventarticlesComponent.prototype.GoToSecond = function () {
        this.event = this.storage.retrieve('event');
        this.event.bundles[this.storage.retrieve('bundle_id')].articles = this.articles;
        this.storage.store('event', this.event);
        this.storage.store('bundle_id', 1);
        //Save in DB
        this.eventService.updateEvent(this.event)
            .subscribe();
    };
    EventarticlesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'eventarticles',
            templateUrl: "eventarticles.component.html",
            styleUrls: ["eventarticles.component.css"]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router, ng2_webstorage_1.SessionStorageService])
    ], EventarticlesComponent);
    return EventarticlesComponent;
}());
exports.EventarticlesComponent = EventarticlesComponent;
//# sourceMappingURL=eventarticles.component.js.map