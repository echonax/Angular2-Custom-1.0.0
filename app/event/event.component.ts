import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Event, EVENTS } from './event.service';

@Component({
  moduleId: module.id,
  selector: 'event',
  templateUrl: './event.component.html'
})
export class EventComponent { 
  title = 'Tour of Events';
  events = EVENTS;
  selectedEvent: Event;
  constructor( private router: Router ) { }

  onSelect(event: Event): void {
    //this.selectedEvent = event;
    this.router.navigate(['/events', event.name]);
  }
}