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
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
const io = require("socket.io-client");
const config_1 = require("../config");
let TweetService = class TweetService {
    constructor(http) {
        this.http = http;
        this.url = config_1.config.backend_url;
    }
    connectToStream() {
        let observable = new Observable_1.Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('tweet', (tweet) => {
                observer.next(tweet);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
    disconnectFromStream() {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.url + '/closetwitterstream', { dummy: "object" }, options)
            .catch(this.handleError)
            .toPromise()
            .then(() => {
            console.log("disconnected from twitter stream");
        });
        //this.socket.disconnect();
    }
    setSearchTerm(searchTerm) {
        return this.http.get(this.url + `/stream/${searchTerm}`)
            .map(this.extractData)
            .catch(this.handleError);
    }
    extractData(res) {
        let body = res.json();
        return body.data || {};
    }
    handleError(error) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
};
TweetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TweetService);
exports.TweetService = TweetService;
//# sourceMappingURL=tweet.service.js.map