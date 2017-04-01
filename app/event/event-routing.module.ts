import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyEventsComponent }    from './myevents.component';
import { EventsComponent }    from './events.component';
import { EventDetailComponent }    from './event-detail.component';
import { EventCreateComponent }    from './event-create/event-create.component';

@NgModule({
  imports: [
    RouterModule.forChild(
        [  
            {          
                path: 'myevents',
                component: MyEventsComponent,
                data: {title: 'Event List'},
                children: [] //need router-outlet for this
            },
            {          
                path: 'events',
                component: EventsComponent,
                data: {title: 'Event List'},
            },
            { 
                path: 'create', 
                component: EventCreateComponent
            }, 
            { 
                path: ':id', 
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