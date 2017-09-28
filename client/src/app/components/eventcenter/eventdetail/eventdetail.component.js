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
var Event_1 = require("../../../model/Event");
var event_service_1 = require("../../../services/event.service");
var bundle_service_1 = require("../../../services/bundle.service");
var router_1 = require("@angular/router");
var ng2_webstorage_1 = require('ng2-webstorage');
var EventdetailComponent = (function () {
    function EventdetailComponent(eventService, bundleService, router, storage) {
        var _this = this;
        this.eventService = eventService;
        this.bundleService = bundleService;
        this.router = router;
        this.storage = storage;
        this.event = new Event_1.Event();
        this.createMode = false;
        this.bundles = new Array();
        this.articles = new Array();
        this.hidden = false;
        this.articleFilter = { name: '' };
        //Set NavigationBar Attributes
        this.detail_status = true;
        this.bundle1_status = this.storage.retrieve('bundle1_status');
        this.active_status = "detail";
        if (this.storage.retrieve("mode") == "edit") {
            this.createMode = false;
            switch (this.eventService.event) {
                case undefined:
                    this.event = this.storage.retrieve('event');
                    break;
                default:
                    this.event = this.eventService.event;
                    break;
            }
            var bundletemp = this.event.bundles;
            //Transform from JSON to Array
            var count = 0;
            for (var propName in bundletemp) {
                this[propName] = bundletemp[propName];
                this.bundles[count] = this[propName];
                count++;
            }
            this.storage.store('event', this.event);
        }
        else {
            console.log("CREATE MODE");
            //Status for Navigation Bar
            this.storage.store('bundle1_status', false);
            this.storage.store('detail_status', true);
            //working on create mode
            //start with empty default storage
            this.createMode = true;
            this.event.title = "Sample Title";
            this.event.notifications = null;
            //build bundles
            var n = 0;
            while (n < 2) {
                this.bundle = {
                    title: "Please edit the Bundle",
                    id: n,
                    description: "Sample Description",
                    smartscore: "0.00",
                    articles: null,
                    discount: "none",
                    theme: 1,
                };
                this.bundles[n] = this.bundle;
                n++;
            }
            this.event.bundles = this.bundles;
            this.storage.store('event', this.event);
        }
        this.eventService.getArticles()
            .subscribe(function (articles) {
            _this.articles = articles;
        });
    }
    EventdetailComponent.prototype.addEvent = function () {
        var newEvent = new Event_1.Event();
        newEvent.title = this.event.title;
        newEvent.cweek = this.event.cweek;
        newEvent.bundles = this.event.bundles;
        newEvent.notifications = this.event.notifications;
        this.bundle_id = 0;
        this.storage.store('bundle_id', this.bundle_id);
        this.storage.store('event', this.event);
        this.storage.store('detail_status', true);
        var that = this;
        function closeModal() {
            document.getElementById("closemodal").click();
            that.router.navigate(['/eventbundleselection']);
        }
        function countdown() {
            that.countdown = that.countdown - 1;
        }
        setInterval(countdown, 1000);
        var countdownReal = Math.floor(Math.random() * (8000 - 3000)) + 3000;
        setTimeout(closeModal, countdownReal);
        this.countdown = parseInt((countdownReal / 1000).toFixed(0));
        if (this.currentArticle) {
            this.storage.store('article', this.currentArticle);
        }
    };
    EventdetailComponent.prototype.updateEvent = function (event) {
        var _event = {
            title: event.title,
            id: event.id,
            cweek: event.cweek,
            bundles: event.bundles,
            notifications: event.notifications,
        };
        this.bundle_id = 0;
        this.storage.store('bundle_id', this.bundle_id);
        //Save in Storage
        this.storage.store('event', this.event);
        this.event = _event;
        this.eventService.updateEvent(this.event)
            .subscribe();
    };
    EventdetailComponent.prototype.cancel = function () {
        event.preventDefault();
        this.storage.clear();
        this.router.navigate(["/eventoverview"]);
    };
    EventdetailComponent.prototype.selectArticle = function (item, event) {
        this.currentArticle = item;
    };
    EventdetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'eventdetail',
            templateUrl: "eventdetail.component.html",
            styleUrls: ["eventdetail.component.css"]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, bundle_service_1.BundleService, router_1.Router, ng2_webstorage_1.SessionStorageService])
    ], EventdetailComponent);
    return EventdetailComponent;
}());
exports.EventdetailComponent = EventdetailComponent;
//# sourceMappingURL=eventdetail.component.js.map