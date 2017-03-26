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

export var EVENTS: Array<Event> = [
  //{ id: 11, name: 'Mr. Nice', type: EventType.Basketball}
];

@Injectable()
export class EventService {
  constructor(private http: Http, private as: AuthService){}

  getEvents() { return EVENTS; }

  getEvent(name: number | string) {
    let res = EVENTS.find(event => event.name == name);
    return res;
  }

  createNewEvent(data){ //or edit if it already exists TODO for real DB owner, eventtype eventname publicity

    let model = {owner: this.as.user.username, eventtype: data.type, eventname: data.name, publicity: EventPublicity.PUBLIC }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:9999/event/create", model, options)
                    .map((res)=>{ return res;})
                    .catch((err)=>{return err;});

    // let found = false;
    // for(let i = 0; i < EVENTS.length; i++){
    //   if(EVENTS[i].name == data.name){//TODO event already exists might wanna change it with id
    //     EVENTS[i] = data;
    //     found = true;
    //     break;
    //   }
    // }
    // if(!found){
    //   EVENTS.push(data);
    // }   
  }
}