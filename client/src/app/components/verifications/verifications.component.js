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
var verification_service_1 = require("../../services/verification.service");
var router_1 = require("@angular/router");
var VerificationsComponent = (function () {
    function VerificationsComponent(verificationService, router) {
        this.verificationService = verificationService;
        this.router = router;
        this.displayVer = true;
        // this.user = new User()
        this.user = {
            phonenumber: "1",
            sms: 0,
            whatsapp: 0,
            setting_key: 0
        };
    }
    VerificationsComponent.prototype.checkUser = function () {
        var _this = this;
        this.verificationService.getUserByNumber(this.phonenumber)
            .subscribe(function (data) {
            console.log(data);
            if (data) {
                _this.user.setting_key = data.setting_key;
                _this.user.whatsapp = data.Whatsapp;
                _this.user.sms = data.SMS;
                _this.user.phonenumber = _this.phonenumber;
                _this.displayVer = false;
            }
        }, function (err) {
            _this.displayAlert = true;
        });
    };
    VerificationsComponent.prototype.checkVerification = function () {
        if (this.verCode == this.user.setting_key) {
            this.verificationService.user = this.user;
            this.router.navigate(['./settings']);
        }
        else {
            this.displayAlert2 = true;
        }
    };
    return VerificationsComponent;
}());
VerificationsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'verifications',
        templateUrl: "verifications.component.html"
    }),
    __metadata("design:paramtypes", [verification_service_1.VerificationService, router_1.Router])
], VerificationsComponent);
exports.VerificationsComponent = VerificationsComponent;
//# sourceMappingURL=verifications.component.js.map