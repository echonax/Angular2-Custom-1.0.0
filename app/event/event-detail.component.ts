import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Event, EventService } from './event.service';
import "rxjs/add/operator/toPromise";

@Component({
  moduleId: module.id,
  selector: 'event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit { 
    event: Event;
    
    constructor( private route: ActivatedRoute, private router: Router, private es: EventService ) {}

    ngOnInit(){
      this.route.params.forEach((params: Params) => {
        if(params['id']){
          this.es.getEvent(params['id']).toPromise()
            .then((res: Event)=>{
              this.event = res[0];
            });
        }else{
          alert("something's wrong with this event");
        }
      });
    }

    onAttend(){
      this.es.addAttendence(this.event.eventid).toPromise()
        .then((res)=>{
          console.log(res);
        });
    }

    onCancelAttention(){
      
    }
}