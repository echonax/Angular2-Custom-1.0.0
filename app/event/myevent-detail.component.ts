import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Event, EventService } from './event.service';
import { EventSubscriptionStatus } from '../enums';
import "rxjs/add/operator/toPromise";

@Component({
  moduleId: module.id,
  selector: 'myevent-detail',
  templateUrl: './myevent-detail.component.html'
})
export class MyEventDetailComponent implements OnInit { 
    event: Event;
    subscribers;
    EventSubscriptionStatus = EventSubscriptionStatus;
    
    constructor( private route: ActivatedRoute, private router: Router, private es: EventService ) {}

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
}