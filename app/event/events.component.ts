import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Event, EventService } from './event.service';
import "rxjs/add/operator/toPromise";

@Component({
  moduleId: module.id,
  selector: 'event',
  templateUrl: './events.component.html'
})
export class EventsComponent { 
  title = 'Tour of Events';
  events = [];
  //selectedEvent: Event;
  constructor( private router: Router, private es: EventService ) { }

  ngOnInit(){
    this.es.getEvents().toPromise()
      .then((res:any)=>{
        this.events = res;
      });
  }

  onSelect(event: Event): void {//this.selectedEvent = event; for detail in the same page
    this.router.navigate(['/events', event.eventid]);
  }
}