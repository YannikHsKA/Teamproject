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
var SettingsComponent = (function () {
    function SettingsComponent(settingsservice, verificationService) {
        this.settingsservice = settingsservice;
        this.verificationService = verificationService;
        this.user = this.verificationService.user;
        console.log(this.user);
        if (this.user.sms == 1) {
            this.sms_toggle = true;
        }
        else {
            this.sms_toggle = false;
        }
        if (this.user.whatsapp == 1) {
            this.whatsapp_toggle = true;
        }
        else {
            this.whatsapp_toggle = false;
        }
        if (this.user.email == 1) {
            this.email_toggle = true;
        }
        else {
            this.email_toggle = false;
        }
        console.log(this);
    }
    SettingsComponent.prototype.switch = function (toggle) {
        //  console.log(toggle);
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
        }
        else {
            this.user.sms = 0;
        }
        if (this.whatsapp_toggle == true) {
            this.user.whatsapp = 1;
        }
        else {
            this.user.whatsapp = 0;
        }
        if (this.email_toggle == true) {
            this.user.email = 1;
        }
        else {
            this.user.email = 0;
        }
        this.settingsservice.updateSettings(this.user);
    };
    SettingsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'settings',
            templateUrl: "settings.component.html"
        }), 
        __metadata('design:paramtypes', [settings_service_1.SettingsService, verification_service_1.VerificationService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map