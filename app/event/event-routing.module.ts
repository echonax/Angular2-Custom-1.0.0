import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventComponent }    from './event.component';
import { EventDetailComponent }    from './event-detail.component';
import { EventCreateComponent }    from './event-create/event-create.component';

@NgModule({
  imports: [
    RouterModule.forChild(
        [  
            {          
                path: '',
                component: EventComponent,
                data: {title: 'Event List'},
                children: [] //need router-outlet for this
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