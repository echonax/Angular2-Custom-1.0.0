import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard }   from './auth-guard.service';

import { AppComponent }   from './app.component';
import { LoginComponent }   from './login/login.component';
import { SignUpComponent }   from './signup/signup.component';
import { PageNotFoundComponent }   from './login/page-not-found.component';
import { HomeComponent }   from './home/home.component';
import { EventComponent }   from './event/event.component';
import { EventDetailComponent }   from './event/event-detail.component';
import { EventCreateComponent }   from './event/event-create/event-create.component';

@NgModule({
  imports: [
     RouterModule.forRoot([
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignUpComponent },
        { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
        { path: 'tweets', loadChildren: 'app/twitter/tweet.module#TweetModule' },
        { path: 'events', loadChildren: 'app/event/event.module#EventModule' },
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }
      ]
      //,{ useHash: true }
  )],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}