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
var NotificationService = (function () {
    function NotificationService(http) {
        this.http = http;
        console.log('Notification Service initialized..');
    }
    NotificationService.prototype.sendWhatsapp = function (notification) {
        console.log("Send out whatsapp");
        var object = { api_key: '1709510af522e46ea619b11642f3c3a8_4552_b41a2200d6875bf6bda88332cb', whatsapp_text: '' };
        object.whatsapp_text = notification.whatsapp_text;
        var data = new FormData();
        data.append("api_key", "1709510af522e46ea619b11642f3c3a8_4552_b41a2200d6875bf6bda88332cb");
        data.append("caption", notification.whatsapp_text + " Webseite: https://goo.gl/CqL91L");
        data.append("msg_type", "image");
        data.append("content", "https://storage.googleapis.com/lidl-smart.appspot.com/currentBundle.jpg");
        //https://whatsbroadcast.me/en/images/telegram-img.jpg
        //  https://storage.cloud.google.com/lidl-smart.appspot.com/currentBundle.jpg
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });
        xhr.open("POST", "https://api.whatsbroadcast.com/v071/send_newsletter");
        xhr.send(data);
    };
    NotificationService.prototype.sendSMS = function (notification) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Send Update for all User:" + notification + "via SMS");
        var body = JSON.stringify(notification);
        this.http.post('/api/sendSMSNewsletter', body, { headers: headers })
            .subscribe(function (data) {
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    NotificationService.prototype.sendEmail = function (notification) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Send Newsletter for all Users:" + notification + "via Email");
        var body = JSON.stringify(notification);
        this.http.post('/api/sendEmailNewsletter', body, { headers: headers })
            .subscribe(function (data) {
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    NotificationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map