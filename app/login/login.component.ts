import { Component } from '@angular/core';
import { Router }      from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  moduleId: module.id,
  selector: 'login-comp',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  model: any = {};
  message: string;
  
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  onSubmit(){
      alert(this.model.name + " " + this.message);
      this.login();
  }
   
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    this.authService.login(this.model).subscribe((res) => {
      if(res._body == "yes"){
        this.setMessage();
        this.authService.logInActions(this.model.name);
        if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/crisis-center/admin';
          this.router.navigate([redirect]);
        }
      }
      
    });
  }

  navigateToSignUp(){
    this.router.navigate(['/signup']);
  }
  
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}