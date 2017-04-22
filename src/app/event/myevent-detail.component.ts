import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Event, EventService } from './event.service';
import { EventType, EventPublicity, EventSubscriptionStatus } from '../enums';
import "rxjs/add/operator/toPromise";

@Component({
  moduleId: module.id,
  selector: 'myevent-detail',
  templateUrl: './myevent-detail.component.html'
})
export class MyEventDetailComponent implements OnInit { 
    event: Event;
    stringifiedEvent: string;
    subscribers;
    EventSubscriptionStatus = EventSubscriptionStatus;
    EventPublicity = EventPublicity;
    editModeFlag = false;
    types = [];
    publicities = [];
    
    constructor( private route: ActivatedRoute, private router: Router, private es: EventService ) {
      for (var enumMember in EventType) {
          if ( isNaN( parseInt( enumMember )) ){
            this.types.push(enumMember);
          }
      }

      for (var enumMember in EventPublicity) {
          if ( isNaN( parseInt( enumMember )) ){
            this.publicities.push(enumMember);
          }
      }
      //this.model.eventtype = this.types[0];
    }

    ngOnInit(){
      this.route.params.forEach((params: Params) => {
        if(params['id']){
          this.es.getEvent(params['id']).toPromise()
            .then((res: Event)=>{
              this.event = res[0];
              this.subscribers = this.es.getMyEventSubscribers(this.event.eventid).toPromise();
            });          
        }else{
          alert("something's wrong with this event");
        }
      });
    }

    changeStatus(mouseevent, user, status){
      this.es.changeAttendence(this.event.eventid, user, status).toPromise()
        .then((res:any)=>{
          if(res._body == "SUCCESS"){
            this.subscribers = this.es.getMyEventSubscribers(this.event.eventid).toPromise(); 
            //might be better to have a single user query and find it with map and just update that one in the array but maybe this is better for events with smaller subscriber counts
          }
        });
    }

    onEdit(){
      this.stringifiedEvent = JSON.stringify(this.event);
      this.editModeFlag = true;
    }

    onSave(){     
      this.editModeFlag = false; 
      this.es.editEvent(this.event.eventtype, this.event.eventname, this.event.publicity, this.event.info, this.event.eventid).toPromise()
        .then((res:any)=>{
          if(res._body == "SUCCESS"){
          }else{
            alert("couldnt edit event");
          }
        });
    }

    onCancel(){
      this.event = JSON.parse(this.stringifiedEvent);
      this.editModeFlag = false;
    }
}