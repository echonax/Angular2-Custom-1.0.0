import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventType, EventPublicity } from '../../enums';
import { Event, EventService } from '../event.service';
import { AuthService } from '../../auth.service';
import "rxjs/add/operator/toPromise";

@Component({
  moduleId: module.id,
  selector: 'event',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent {

  types: Array<any> = [];
  publicities: Array<any> = [];
  model: Event = new Event("", EventType.Any, EventPublicity.PUBLIC, this.as.user); 
  submitted = false;

  constructor( private router: Router, private es: EventService, private as: AuthService ) {
      for (var enumMember in EventType) {
          if ( isNaN( parseInt( enumMember )) ){
            this.types.push(enumMember);
          }
      }
      this.model.eventtype = this.types[0];

      for (var enumMember in EventPublicity) {
          if ( isNaN( parseInt( enumMember )) ){
            this.publicities.push(enumMember);
          }
      }
      this.model.publicity = this.publicities[0];
  }  

  onSubmit() { 
      this.submitted = true;
      this.es.createNewEvent(this.model.eventtype, this.model.eventname, this.model.info).toPromise()
        .then((res)=>{
          console.log(res);//TODO
        });
  }

  newEvent() {
    this.model = new Event("", EventType.Any, EventPublicity.PUBLIC, this.as.user); 
  }

  onSelect(event: Event): void {
    //this.selectedEvent = event;
    //this.router.navigate(['/events', event.id]);
  }
}