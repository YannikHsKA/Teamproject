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
var VerificationsComponent = (function () {
    function VerificationsComponent(verificationService) {
        this.verificationService = verificationService;
    }
    VerificationsComponent.prototype.checkUser = function () {
        console.log(this.phonenumber);
        this.verificationService.getUserByNumber(this.phonenumber)
            .subscribe(function (data) {
            console.log(data);
            /*
            if(data){
              this.user = data;
              //TODO: display verification field
            }else{
              //TODO: display Alert that user doesn't exist
            }*/
        }, function (err) {
            console.log(err);
        });
    };
    VerificationsComponent.prototype.checkVerification = function () {
        console.log(this.verCode);
        console.log(this.user);
        if (this.verCode == this.user.settingkey) {
            //TODO: routing to personalized settings page (with telephonenumber in URL)
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
    __metadata("design:paramtypes", [verification_service_1.VerificationService])
], VerificationsComponent);
exports.VerificationsComponent = VerificationsComponent;
//# sourceMappingURL=verifications.component.js.map