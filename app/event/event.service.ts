import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { EventType, EventPublicity } from '../enums';

export class Event {
  constructor(           
    public eventname: string, 
    public eventtype: EventType,
    public publicity: EventPublicity,
    public owner: string, 
    public info?: any,
    public subscribers?: number,
    public eventid?: number
    ) {}
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

  getEvents(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/otherevents/get", {username: this.as.user}, options)
                    .map((res)=> res.json())
                    .catch((err)=> err);
  }

  getEvent(id: number | string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/event/get", {id: id}, options)
                    .map((res)=> res.json())
                    .catch((err)=> err);
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