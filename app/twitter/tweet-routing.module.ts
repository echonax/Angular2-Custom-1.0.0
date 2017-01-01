import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TweetComponent }    from './tweet.component';

@NgModule({
  imports: [
    RouterModule.forChild(
        [
           {
             path: '',
             component: TweetComponent,
             children: []
           }
        ]
    )
  ],
  exports: [
    RouterModule
  ]
})
export class TweetRoutingModule { }