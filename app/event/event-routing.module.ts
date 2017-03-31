import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventComponent }    from './event.component';
import { OtherEventsComponent }    from './other-events.component';
import { EventDetailComponent }    from './event-detail.component';
import { EventCreateComponent }    from './event-create/event-create.component';

@NgModule({
  imports: [
    RouterModule.forChild(
        [  
            {          
                path: 'myevents',
                component: EventComponent,
                data: {title: 'Event List'},
                children: [] //need router-outlet for this
            },
            {          
                path: 'events',
                component: OtherEventsComponent,
                data: {title: 'Event List'},
            },
            { 
                path: 'create', 
                component: EventCreateComponent
            }, 
            { 
                path: ':name', 
                component: EventDetailComponent 
            }
        ]
    )
  ],
  exports: [
    RouterModule
  ]
})
export class EventRoutingModule { }