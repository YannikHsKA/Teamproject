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
var BundlesComponent = (function () {
    function BundlesComponent() {
        document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
    }
    BundlesComponent.prototype.ngOnDestroy = function () {
        document.body.style.backgroundImage = "none";
    };
    return BundlesComponent;
}());
BundlesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'bundles',
        templateUrl: "bundles.component.html",
        styleUrls: ["bundles.component.css"]
    }),
    __metadata("design:paramtypes", [])
], BundlesComponent);
exports.BundlesComponent = BundlesComponent;
//# sourceMappingURL=bundles.component.js.map