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
var D3 = require("d3");
require("rxjs/add/operator/take");
var tweet_service_1 = require("./tweet.service");
var TweetComponent = (function () {
    function TweetComponent(_element, _tweetService) {
        this._element = _element;
        this._tweetService = _tweetService;
        this.tweets = [];
        this.host = D3.select(this._element.nativeElement);
    }
    TweetComponent.prototype.ngOnInit = function () {
        // this.buildSVG();
        this.connectToTweetStream();
    };
    TweetComponent.prototype.buildSVG = function () {
        this.streamContainer = this.host.append('div');
    };
    TweetComponent.prototype.connectToTweetStream = function () {
        var _this = this;
        this.streamConnection = this._tweetService.connectToStream()
            .take(4)
            .subscribe(function (tweet) {
            // this.streamContainer.append('p').html(tweet.username);
            _this.tweets.push(tweet);
            if (_this.tweets.length === 10) {
                _this.tweets.shift();
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TweetComponent.prototype.setSearchTerm = function (searchTerm) {
        var _this = this;
        this._tweetService.setSearchTerm(searchTerm)
            .toPromise()
            .then(function () { return console.log('search term set'); }, function (error) { return _this.errorMessage = error; });
    };
    TweetComponent.prototype.disconnectFromStream = function () {
        this._tweetService.disconnectFromStream();
    };
    TweetComponent.prototype.ngOnDestroy = function () {
        this.streamConnection.unsubscribe();
        this.disconnectFromStream();
    };
    return TweetComponent;
}());
TweetComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tweet',
        templateUrl: './tweet.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, tweet_service_1.TweetService])
], TweetComponent);
exports.TweetComponent = TweetComponent;
//# sourceMappingURL=tweet.component.js.map