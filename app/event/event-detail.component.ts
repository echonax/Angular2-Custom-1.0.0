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
        console.log(1,params);
        if(params['id']){
          this.es.getEvent(params['id']).toPromise()
            .then((res: Event)=>{
              console.log(res);
              this.event = res[0];
            });
        }else{
          alert("something's wrong with this event");
        }
        

        
        //let id = +params['id']; // (+) converts string 'id' to a number
        //this.event = this.es.getEvent(id);
      });
    }
}