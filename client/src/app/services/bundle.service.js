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
var BundleService = (function () {
    function BundleService(http) {
        this.http = http;
        console.log('Bundle Service initialized..');
    }
    BundleService.prototype.deleteBundle = function (event, bundle) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/deletebundle/' + bundle, JSON.stringify(event), { headers: headers });
    };
    BundleService.prototype.getBundles = function (event) {
        return this.http.get('/api/geteventbundles/' + event.id)
            .map(function (res) { return res.json(); });
    };
    BundleService.prototype.getBundlesByCweek = function (cweek) {
        return this.http.get('/api/getdatabundles/' + cweek)
            .map(function (res) { return res.json(); });
    };
    BundleService.prototype.getBundlesByCweekAndArticle = function (cweek, ean) {
        return this.http.get('/api/getdatabundlescase2/' + cweek + '/' + ean)
            .map(function (res) { return res.json(); });
    };
    BundleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BundleService);
    return BundleService;
}());
exports.BundleService = BundleService;
//# sourceMappingURL=bundle.service.js.map