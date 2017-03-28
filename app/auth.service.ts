import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
//import 'rxjs/*';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

interface User {
  username: string;
}

@Injectable()
export class AuthService {
  redirectUrl: string = '/home';// store the URL so we can redirect after logging in
  user: string = sessionStorage.getItem('user');  

  constructor(private http: Http){}

  login(model): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/login", model, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{return err;});
  }

  logInActions(username: string){
    this.user = username;
    sessionStorage.setItem('user', username);
  }

  logout(): void {
    this.user = null;
    sessionStorage.removeItem('user');
  }
}