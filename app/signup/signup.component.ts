import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/toPromise";

@Component({
  moduleId: module.id,
  selector: 'signup-comp',
  templateUrl: 'signup.component.html'
})
export class SignUpComponent {
  model: any = {username:"", password:""};
  
  constructor(public router: Router, private http: Http) {}

  onSubmit(): void{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://localhost:9999/signup", this.model, options)
                  .map((res)=>{ return res;})
                  .catch((err)=>{console.log(err); return err;})
                  .toPromise()
                  .then((res: any)=>{
                    console.log(res);
                    if(res._body == 23505){
                      alert("username exists");
                    }else if(res._body == "yes"){
                      alert("successfully created");
                    }
                  });
  }
}