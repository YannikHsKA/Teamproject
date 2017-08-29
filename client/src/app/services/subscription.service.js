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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var SubscriptionService = (function () {
    function SubscriptionService(http) {
        this.http = http;
        console.log('Subscription Service initialized..');
    }
    SubscriptionService.prototype.addUser = function (newUser) {
        var user_without_plus = newUser;
        while (user_without_plus.phonenumber.charAt(0) === '+') {
            user_without_plus.phonenumber = user_without_plus.phonenumber.substr(1);
        }
        if (newUser.whatsapp == 1) {
            var data = new FormData();
            data.append("api_key", "1709510af522e46ea619b11642f3c3a8_4552_b41a2200d6875bf6bda88332cb");
            data.append("usernumber", newUser.phonenumber);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });
            xhr.open("POST", "https://api.whatsbroadcast.com/v071/set_start");
            xhr.send(data);
        }
        var headers_api = new http_1.Headers();
        headers_api.append('Content-Type', 'application/json');
        return this.http.post('/api/subscribe', JSON.stringify(user_without_plus), { headers: headers_api });
    };
    SubscriptionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SubscriptionService);
    return SubscriptionService;
}());
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map