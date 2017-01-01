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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
var io = require("socket.io-client");
var config_1 = require("../config");
var TweetService = (function () {
    function TweetService(http) {
        this.http = http;
        this.url = config_1.config.backend_url;
    }
    TweetService.prototype.connectToStream = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket = io(_this.url);
            _this.socket.on('tweet', function (tweet) {
                observer.next(tweet);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    TweetService.prototype.disconnectFromStream = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.url + '/closetwitterstream', { dummy: "object" }, options)
            .catch(this.handleError)
            .toPromise()
            .then(function () {
            console.log("disconnected from twitter stream");
        });
        //this.socket.disconnect();
    };
    TweetService.prototype.setSearchTerm = function (searchTerm) {
        return this.http.get(this.url + ("/stream/" + searchTerm))
            .map(this.extractData)
            .catch(this.handleError);
    };
    TweetService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    TweetService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message : error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    return TweetService;
}());
TweetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TweetService);
exports.TweetService = TweetService;
//# sourceMappingURL=tweet.service.js.map