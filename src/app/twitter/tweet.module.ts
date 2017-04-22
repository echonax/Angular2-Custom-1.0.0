import { NgModule }      from '@angular/core';
import { TweetRoutingModule } from './tweet-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { TweetService } from './tweet.service';
import { TweetComponent }    from './tweet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TweetRoutingModule
  ],
  declarations: [
    TweetComponent
  ],
  providers: [
    TweetService
  ]
})
export class TweetModule {}
