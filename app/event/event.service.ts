import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { EventType, EventPublicity } from '../enums';

export class Event {
  constructor(    
    public name: string, 
    public type: EventType, 
    public size?: number, 
    public city?: string, 
    public district?: string,
    public id?: number,    
    ) { 

  }
}

@Injectable()
export class EventService {
  constructor(private http: Http, private as: AuthService){}

  getMyEvents() { 
    //if(!this.as.user){return "err"}
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/myevents/get", {username: this.as.user}, options)
                    .map((res)=> res.json())
                    .catch((err)=> err);
  }

  getOtherEvents(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/otherevents/get", {username: this.as.user}, options)
                    .map((res)=> res.json())
                    .catch((err)=> err);
  }

  getEvent(name: number | string) {
    //let res = EVENTS.find(event => event.name == name);
    //return res;
  }

  createNewEvent(data){
    
    let model = {owner: this.as.user, eventtype: data.type, eventname: data.name, publicity: EventPublicity.PUBLIC }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/event/create", model, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{return err;});  
  }
}