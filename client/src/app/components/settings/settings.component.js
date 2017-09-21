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
var settings_service_1 = require('../../services/settings.service');
var verification_service_1 = require('../../services/verification.service');
var router_1 = require("@angular/router");
var SettingsComponent = (function () {
    function SettingsComponent(settingsservice, verificationService, router) {
        this.settingsservice = settingsservice;
        this.verificationService = verificationService;
        this.router = router;
        this.user = this.verificationService.user;
        console.log(this.user);
        if (this.user.phonenumber == null) {
            this.phone_entered = false;
        }
        else {
            this.phone_entered = true;
        }
        if (this.user.email_address == "") {
            this.email_entered = false;
        }
        else {
            this.email_entered = true;
        }
        if (this.user.sms == 1) {
            this.sms_toggle = true;
            this.sms_toggle_initial = true;
        }
        else {
            this.sms_toggle = false;
            this.sms_toggle_initial = false;
        }
        if (this.user.whatsapp == 1) {
            this.whatsapp_toggle = true;
            this.whatsapp_toggle_initial = true;
        }
        else {
            this.whatsapp_toggle = false;
            this.whatsapp_toggle_initial = false;
        }
        if (this.user.email == 1) {
            this.email_toggle = true;
            this.email_toggle_initial = true;
        }
        else {
            this.email_toggle = false;
            this.email_toggle_initial = false;
        }
        console.log(this);
        document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
    }
    SettingsComponent.prototype.ngOnDestroy = function () {
        document.body.style.backgroundImage = "none";
    };
    SettingsComponent.prototype.switch = function (toggle) {
        switch (toggle) {
            case 'whatsapp':
                this.whatsapp_toggle = !this.whatsapp_toggle;
                break;
            case 'sms':
                this.sms_toggle = !this.sms_toggle;
                break;
            case 'email':
                this.email_toggle = !this.email_toggle;
                break;
        }
    };
    SettingsComponent.prototype.saveSettings = function () {
        if (this.sms_toggle == true) {
            this.user.sms = 1;
            if (this.sms_toggle_initial == false) {
                this.settingsservice.sendSMSUpdate("subscribe", this.user);
                this.sms_toggle_initial = true;
            }
        }
        else {
            this.user.sms = 0;
            if (this.sms_toggle_initial == true) {
                this.settingsservice.sendSMSUpdate("unsubscribe", this.user);
                this.sms_toggle_initial = false;
            }
        }
        if (this.whatsapp_toggle == true) {
            this.user.whatsapp = 1;
            if (this.whatsapp_toggle_initial == false) {
                this.settingsservice.sendWhatsAppUpdate("subscribe", this.user);
                this.whatsapp_toggle_initial = true;
            }
        }
        else {
            this.user.whatsapp = 0;
            if (this.whatsapp_toggle_initial == true) {
                this.settingsservice.sendWhatsAppUpdate("unsubscribe", this.user);
                this.whatsapp_toggle_initial = false;
            }
        }
        if (this.email_toggle == true) {
            this.user.email = 1;
            if (this.email_toggle_initial == false) {
                this.settingsservice.sendEmailUpdate("subscribe", this.user);
                this.email_toggle_initial = true;
            }
        }
        else {
            this.user.email = 0;
            if (this.email_toggle_initial == true) {
                this.settingsservice.sendEmailUpdate("unsubscribe", this.user);
                this.email_toggle_initial = false;
            }
        }
        if (!this.user.email_address.indexOf("")) {
            this.email_entered = true;
        }
        else if (!this.user.phonenumber.indexOf("")) {
            this.phone_entered = true;
        }
        this.settingsservice.updateSettings(this.user);
        this.saveSuccess = true;
        this.router.navigate(['./verification']);
    };
    SettingsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'settings',
            templateUrl: "settings.component.html",
            styleUrls: ['settings.component.css']
        }), 
        __metadata('design:paramtypes', [settings_service_1.SettingsService, verification_service_1.VerificationService, router_1.Router])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map