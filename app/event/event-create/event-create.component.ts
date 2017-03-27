import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventType } from '../../enums';
import { Event, EventService } from '../event.service';
import "rxjs/add/operator/toPromise";

@Component({
  moduleId: module.id,
  selector: 'event',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent {

  types: any = [];  
  model: Event = new Event("", EventType.Any); 
  submitted = false;

  constructor( private router: Router, private es: EventService ) {
      for (var enumMember in EventType) {
          if ( isNaN( parseInt( enumMember )) ){
            this.types.push(enumMember);
          }
      }
      this.model.type = this.types[0];
  }  

  onSubmit() { 
      this.submitted = true;
      this.es.createNewEvent(this.model).toPromise()
        .then((res)=>{
          console.log(res);//TODO
        });
  }

  newEvent() {
    this.model = new Event("", EventType.Any);
  }

  onSelect(event: Event): void {
    //this.selectedEvent = event;
    //this.router.navigate(['/events', event.id]);
  }
}