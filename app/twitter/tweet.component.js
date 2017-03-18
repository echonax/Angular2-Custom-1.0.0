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
const core_1 = require('@angular/core');
const D3 = require('d3');
require('rxjs/add/operator/take');
const tweet_service_1 = require('./tweet.service');
let TweetComponent = class TweetComponent {
    constructor(_element, _tweetService) {
        this._element = _element;
        this._tweetService = _tweetService;
        this.tweets = [];
        this.host = D3.select(this._element.nativeElement);
    }
    ngOnInit() {
        // this.buildSVG();
        this.connectToTweetStream();
    }
    buildSVG() {
        this.streamContainer = this.host.append('div');
    }
    connectToTweetStream() {
        this.streamConnection = this._tweetService.connectToStream()
            .take(4)
            .subscribe((tweet) => {
            // this.streamContainer.append('p').html(tweet.username);
            this.tweets.push(tweet);
            if (this.tweets.length === 10) {
                this.tweets.shift();
            }
        }, error => this.errorMessage = error);
    }
    setSearchTerm(searchTerm) {
        this._tweetService.setSearchTerm(searchTerm)
            .toPromise()
            .then(() => console.log('search term set'), error => this.errorMessage = error);
    }
    disconnectFromStream() {
        this._tweetService.disconnectFromStream();
    }
    ngOnDestroy() {
        this.streamConnection.unsubscribe();
        this.disconnectFromStream();
    }
};
TweetComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tweet',
        templateUrl: './tweet.component.html'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, tweet_service_1.TweetService])
], TweetComponent);
exports.TweetComponent = TweetComponent;
//# sourceMappingURL=tweet.component.js.map