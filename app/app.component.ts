import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 
  constructor(public authService: AuthService, public router: Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}