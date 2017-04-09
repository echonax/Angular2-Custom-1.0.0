import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { EventType, EventPublicity, EventSubscriptionStatus } from '../enums';

export class Event {
  constructor(
    public eventname: string, 
    public eventtype: EventType,
    public publicity: EventPublicity,
    public owner: string,
    public info?: any,
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

  getMyEventSubscribers(eventid){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/myevents/getSubscribers", {eventid: eventid}, options)
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

  createNewEvent(eventtype, eventname, info){    
    let model = {owner: this.as.user, eventtype: eventtype, eventname: eventname, publicity: EventPublicity.PUBLIC, info: info };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/event/create", model, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{return err;});  
  }

  editEvent(eventtype, name, publicity, info, eventid){
    let model = {eventtype: eventtype, eventname: name, publicity: EventPublicity.PUBLIC, info: info, eventid: eventid };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/event/edit", model, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{return err;}); 
  }

  addAttendence(eventid){ // subscriber method
    let data = {eventid: eventid, user: this.as.user, attention: EventSubscriptionStatus.SUBSCRIBED};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/event/addAttendence", data, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{return err;}); 
  }

  cancelAttendence(eventid){
    let data = {eventid: eventid, user: this.as.user};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/event/cancelAttendence", data, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{return err;}); 
  }

  changeAttendence(eventid, username: string, status: EventSubscriptionStatus){ // owner method
    let data = {eventid: eventid, username: username, status: status};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/event/changeAttendenceStatus", data, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{return err;});
  }
}