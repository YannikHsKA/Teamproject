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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var Event_1 = require("../model/Event");
var ng2_webstorage_1 = require('ng2-webstorage');
var EventService = (function () {
    function EventService(http, storage) {
        this.http = http;
        this.storage = storage;
        console.log('Event Service initialized..');
    }
    EventService.prototype.getEvents = function () {
        return this.http.get('/api/getevents')
            .map(function (res) { return res.json(); });
    };
    EventService.prototype.getArticles = function () {
        return this.http.get('/api/getarticles')
            .map(function (res) { return res.json(); });
    };
    EventService.prototype.getCurrentEvent = function () {
        return this.http.get('/api/getcurrentevent')
            .map(function (res) { return res.json(); });
    };
    EventService.prototype.addEvent = function (newEvent) {
        console.log("addEvent", newEvent);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/createevent', JSON.stringify(newEvent), { headers: headers }).map(this.extractData);
    };
    EventService.prototype.addNotification = function (newNotification, eventid) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/createnotification/' + eventid, JSON.stringify(newNotification), { headers: headers }).map(this.extractData);
    };
    EventService.prototype.createPdf = function (event) {
        //Bundle 1
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("create PDF for Event :" + event.title);
        var body = JSON.stringify(event);
        this.http.post('/api/createpdf', body, { headers: headers })
            .subscribe(function (data) {
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    EventService.prototype.updateEvent = function (event) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/updateevent', JSON.stringify(event), { headers: headers });
    };
    EventService.prototype.updateCurrentEvent = function (event) {
        console.log(event);
        event.notifications = null;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('/api/updatecurrentevent', JSON.stringify(event), { headers: headers })
            .subscribe(function (data) {
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    EventService.prototype.deleteEvent = function (event) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/deleteevent', JSON.stringify(event), { headers: headers });
    };
    EventService.prototype.extractData = function (res) {
        var body = res.text();
        this.storage_temp = new ng2_webstorage_1.SessionStorageService();
        this.event_temp = new Event_1.Event();
        this.event_temp = this.storage_temp.retrieve('event');
        this.event_temp.id = body;
        this.storage_temp.store('event', this.event_temp);
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ng2_webstorage_1.SessionStorageService])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map