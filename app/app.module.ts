import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }   from './app.component';
import { LoginComponent }   from './login/login.component';
import { PageNotFoundComponent }   from './login/page-not-found.component';
import { HomeComponent }   from './home/home.component';

import { AuthGuard }   from './auth-guard.service';
import { AuthService }   from './auth.service';

import { TopologyModule } from './topology/topology.module';
import { TweetModule } from './twitter/tweet.module';
import { EventModule } from './event/event.module';

@NgModule({
  imports:      [
    BrowserModule, 
    FormsModule,
    HttpModule,

    //TweetModule,
    //EventModule,
    TopologyModule,

    AppRoutingModule,    
  ],
  declarations: [ 
    AppComponent, 
    LoginComponent, 
    PageNotFoundComponent,
    HomeComponent
  ],
  providers:[ AuthGuard, AuthService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}


