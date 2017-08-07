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
var SettingsService = (function () {
    function SettingsService(http) {
        this.http = http;
        console.log('Settings Service initialized..');
    }
    SettingsService.prototype.updateSettings = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Update User:" + user);
        var body = JSON.stringify(user);
        this.http.post('/api/updatesettings', body, { headers: headers })
            .subscribe(function (data) {
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    SettingsService.prototype.sendWhatsAppUpdate = function (subscribe_flag, user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Send Update for User:" + user + "via Whatsapp");
        var body = JSON.stringify(user);
        if (subscribe_flag == "subscribe") {
            this.http.post('/api/sendWhatsAppUpdate_subscribe', body, { headers: headers })
                .subscribe(function (data) {
            }, function (error) {
                console.log(JSON.stringify(error.json()));
            });
        }
        else if (subscribe_flag == "unsubscribe") {
            this.http.post('/api/sendWhatsAppUpdate_unsubscribe', body, { headers: headers })
                .subscribe(function (data) {
            }, function (error) {
                console.log(JSON.stringify(error.json()));
            });
        }
    };
    SettingsService.prototype.sendEmailUpdate = function (subscribe_flag, user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Send Update for User:" + user + "via Email");
        var body = JSON.stringify(user);
        if (subscribe_flag == "subscribe") {
            this.http.post('/api/sendEmailUpdate_subscribe', body, { headers: headers })
                .subscribe(function (data) {
            }, function (error) {
                console.log(JSON.stringify(error.json()));
            });
        }
        else if (subscribe_flag == "unsubscribe") {
            this.http.post('/api/sendEmailUpdate_unsubscribe', body, { headers: headers })
                .subscribe(function (data) {
            }, function (error) {
                console.log(JSON.stringify(error.json()));
            });
        }
    };
    SettingsService.prototype.sendSMSUpdate = function (subscribe_flag, user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Send Update for User:" + user + "via SMS");
        var body = JSON.stringify(user);
        if (subscribe_flag == "subscribe") {
            this.http.post('/api/sendSMSUpdate_subscribe', body, { headers: headers })
                .subscribe(function (data) {
            }, function (error) {
                console.log(JSON.stringify(error.json()));
            });
        }
        else if (subscribe_flag == "unsubscribe") {
            this.http.post('/api/sendSMSUpdate_unsubscribe', body, { headers: headers })
                .subscribe(function (data) {
            }, function (error) {
                console.log(JSON.stringify(error.json()));
            });
        }
    };
    SettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map