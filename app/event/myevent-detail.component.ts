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
              this.subscribers = this.es.getMyEventSubscribers(this.event.eventid);
            });          
        }else{
          alert("something's wrong with this event");
        }
      });
    }

    onAttend(){
      this.es.addAttendence(this.event.eventid).toPromise()
        .then((res:any)=>{
          if(res._body == "23505"){
            alert("you are already in this one");
          }else if(res._body == "SUCCESS"){
            alert("Yay!");
          }
        });
    }

    onCancelAttention(){
      this.es.cancelAttendence(this.event.eventid).toPromise()
        .then((res:any)=>{
          console.log(res);
        });
    }
}