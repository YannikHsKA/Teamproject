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
var WebStorage_1 = require("angular2-localstorage/WebStorage");
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var SessionService = (function () {
    function SessionService(http) {
        this.http = http;
        this._dummyObj = {
            events: {
                title: "",
                start: "",
                end: "",
                bundles: [{
                        title: "",
                        description: "",
                        picture: "",
                        bundleId: "",
                        articles: [{
                                title: "",
                                description: "",
                                price: "",
                                picture: ""
                            }
                        ]
                    }
                ]
            }
        };
        console.log('Session Service Initialized...');
        this.clear();
    }
    SessionService.prototype.getResultObj = function () {
        return this._dummyObj;
    };
    SessionService.prototype.setResultObj = function (value) {
        this._resultObj = value;
    };
    SessionService.prototype.geBundles = function () {
        return this._bundles;
    };
    SessionService.prototype.setBundles = function (value) {
        this._bundles = value;
    };
    SessionService.prototype.getEvents = function () {
        return this._events;
    };
    SessionService.prototype.setEvents = function (value) {
        this._events = value;
    };
    SessionService.prototype.getArticles = function () {
        return this._articles;
    };
    SessionService.prototype.setArticles = function (value) {
        this._articles = value;
    };
    SessionService.prototype.clear = function () {
        this.setResultObj(null);
        this.setEvents(null);
        this.setBundles(null);
        this.setArticles(null);
    };
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', Object)
    ], SessionService.prototype, "_resultObj", void 0);
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', Array)
    ], SessionService.prototype, "_events", void 0);
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', Array)
    ], SessionService.prototype, "_bundles", void 0);
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', Array)
    ], SessionService.prototype, "_articles", void 0);
    SessionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map