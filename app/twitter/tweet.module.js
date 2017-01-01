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
var core_1 = require("@angular/core");
var tweet_routing_module_1 = require("./tweet-routing.module");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var tweet_service_1 = require("./tweet.service");
var tweet_component_1 = require("./tweet.component");
var TweetModule = (function () {
    function TweetModule() {
    }
    return TweetModule;
}());
TweetModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            tweet_routing_module_1.TweetRoutingModule
        ],
        declarations: [
            tweet_component_1.TweetComponent
        ],
        providers: [
            tweet_service_1.TweetService
        ]
    }),
    __metadata("design:paramtypes", [])
], TweetModule);
exports.TweetModule = TweetModule;
//# sourceMappingURL=tweet.module.js.map