import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
//import 'rxjs/*';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn: string = sessionStorage.getItem('isLoggedIn');  
  redirectUrl: string = '/home';// store the URL so we can redirect after logging in

  constructor(private http: Http){}

  login(model): Observable<any> {
    /*return Observable.of(true).delay(1000)
      .do((val) => {
        this.isLoggedIn = 'true';
        sessionStorage.setItem('isLoggedIn', 'true');
      });*/

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/login", model, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{console.log(err); return err;});
  }

  logInActions(){
    this.isLoggedIn = 'true';
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    this.isLoggedIn = 'false';
    sessionStorage.setItem('isLoggedIn', 'false');
  }
}