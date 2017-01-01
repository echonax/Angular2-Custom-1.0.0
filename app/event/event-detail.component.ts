import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Event, EventService } from './event.service';

@Component({
  moduleId: module.id,
  selector: 'event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit { 
    //@Input()
    event: Event;
    constructor( private route: ActivatedRoute, private router: Router, private es: EventService ) {

    }

    ngOnInit(){
      this.route.params.forEach((params: Params) => {
        console.log(1,params);
        let name = params['name']; 
        this.event = this.es.getEvent(name);

        
        //let id = +params['id']; // (+) converts string 'id' to a number
        //this.event = this.es.getEvent(id);
      });
    }
}