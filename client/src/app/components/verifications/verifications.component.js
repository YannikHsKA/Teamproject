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
var verification_service_1 = require("../../services/verification.service");
var User_js_1 = require("../../model/User.js");
var router_1 = require('@angular/router');
var VerificationsComponent = (function () {
    function VerificationsComponent(verificationService, router) {
        this.verificationService = verificationService;
        this.router = router;
        this.user = new User_js_1.User();
        this.displayVer = true;
        this.disPhoneButton = true;
        this.disMailButton = true;
        document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
    }
    VerificationsComponent.prototype.ngOnDestroy = function () {
        document.body.style.backgroundImage = "none";
    };
    VerificationsComponent.prototype.checkUserByPhone = function () {
        var _this = this;
        this.verificationService.getUserByNumber(this.phonenumber)
            .subscribe(function (data) {
            if (data) {
                _this.user.id = data.id;
                _this.user.setting_key = data.setting_key;
                _this.user.whatsapp = data.whatsapp;
                _this.user.email = data.email;
                _this.user.email_address = data.email_address;
                _this.user.sms = data.sms;
                _this.user.phonenumber = data.phonenumber;
                _this.displayVer = false;
            }
        }, function (err) {
            console.log("User" + _this.phonenumber + "not found");
            _this.displayAlert = true;
        });
    };
    VerificationsComponent.prototype.checkUserByMail = function () {
        var _this = this;
        this.verificationService.getUserByMail(this.email_address)
            .subscribe(function (data) {
            console.log(data);
            if (data) {
                _this.user.id = data.id;
                _this.user.setting_key = data.setting_key;
                _this.user.whatsapp = data.whatsapp;
                _this.user.email = data.email;
                _this.user.email_address = data.email_address;
                _this.user.sms = data.sms;
                _this.user.phonenumber = data.phonenumber;
                _this.displayVer = false;
            }
        }, function (err) {
            console.log("User" + _this.email_address + "not found");
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
    VerificationsComponent.prototype.showPhoneVer = function () {
        if (!this.verifyPhone && this.verifyMail) {
            this.verifyPhone = true;
            this.verifyMail = false;
        }
        else if (!this.verifyPhone) {
            this.verifyPhone = true;
        }
        else {
            this.verifyPhone = false;
        }
    };
    VerificationsComponent.prototype.showMailVer = function () {
        if (!this.verifyMail && this.verifyPhone) {
            this.verifyMail = true;
            this.verifyPhone = false;
        }
        else if (!this.verifyMail) {
            this.verifyMail = true;
        }
        else {
            this.verifyMail = false;
        }
    };
    VerificationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'verifications',
            templateUrl: "verifications.component.html",
            styleUrls: ['verifications.component.css']
        }), 
        __metadata('design:paramtypes', [verification_service_1.VerificationService, router_1.Router])
    ], VerificationsComponent);
    return VerificationsComponent;
}());
exports.VerificationsComponent = VerificationsComponent;
//# sourceMappingURL=verifications.component.js.map