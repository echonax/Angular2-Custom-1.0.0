import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopologyComponent }    from './topology.component';
import { TopologyDetailComponent }    from './topology-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild(
        [
            { path: 'topology',  component: TopologyComponent },
            { path: 'topology/:id', component: TopologyDetailComponent }
        ]
    )
  ],
  exports: [
    RouterModule
  ]
})
export class TopologyRoutingModule { }