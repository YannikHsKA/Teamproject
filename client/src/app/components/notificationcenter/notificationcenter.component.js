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
var NotificationcenterComponent = (function () {
    function NotificationcenterComponent() {
        this.email_active = false;
        this.sms_active = true;
        this.whatsapp_active = false;
        document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
    }
    NotificationcenterComponent.prototype.switchLane = function (btn) {
    };
    NotificationcenterComponent.prototype.ngOnDestroy = function () {
        document.body.style.backgroundImage = "none";
    };
    NotificationcenterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notificationcenter',
            templateUrl: "notificationcenter.component.html",
            styleUrls: ['notificationcenter.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], NotificationcenterComponent);
    return NotificationcenterComponent;
}());
exports.NotificationcenterComponent = NotificationcenterComponent;
//# sourceMappingURL=notificationcenter.component.js.map