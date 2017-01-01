import { Injectable } from '@angular/core';
import { EventType } from '../enums';

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

export var EVENTS: Event[] = [
  //{ id: 11, name: 'Mr. Nice', type: EventType.Basketball}
];

@Injectable()
export class EventService {
  getEvents() { return EVENTS; }

  getEvent(name: number | string) {
    let res = EVENTS.find(event => event.name == name);
    return res;
  }

  createNewEvent(data){ //or edit if it already exists
    let found = false;
    for(let i = 0; i < EVENTS.length; i++){
      if(EVENTS[i].name == data.name){//TODO event already exists might wanna change it with id
        EVENTS[i] = data;
        found = true;
        break;
      }
    }
    if(!found){
      EVENTS.push(data);
    }   
  }
}