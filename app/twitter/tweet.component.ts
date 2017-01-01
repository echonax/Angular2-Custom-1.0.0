import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as D3 from 'd3';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { TweetService } from './tweet.service';

@Component({
  moduleId: module.id,
  selector: 'tweet',
  templateUrl: './tweet.component.html'
})
export class TweetComponent implements OnInit, OnDestroy {
  errorMessage: string;
  host;
  streamContainer;
  term: string;
  tweets: any = [];
  streamConnection: Subscription;

  constructor (private _element: ElementRef, private _tweetService: TweetService) {
    this.host = D3.select(this._element.nativeElement);
  }

  ngOnInit() {
    // this.buildSVG();
    this.connectToTweetStream();
  }

  buildSVG(): void {
    this.streamContainer = this.host.append('div');
  }

  connectToTweetStream() {
    this.streamConnection = this._tweetService.connectToStream()
      .take(4)
      .subscribe(
        (tweet:any) => {
          // this.streamContainer.append('p').html(tweet.username);
          this.tweets.push(tweet);
          if(this.tweets.length === 10){
            this.tweets.shift();
          }
        },
        error =>  this.errorMessage = <any>error
      );
  }

  setSearchTerm(searchTerm) {
    this._tweetService.setSearchTerm(searchTerm)
      .toPromise()
      .then(
        () => console.log('search term set'),
        error =>  this.errorMessage = <any>error
      )
  }

  disconnectFromStream(){
    this._tweetService.disconnectFromStream();
  }

  ngOnDestroy() {
    this.streamConnection.unsubscribe();
    this.disconnectFromStream();
  }
}