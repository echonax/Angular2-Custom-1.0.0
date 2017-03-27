import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopologyComponent }    from './topology.component';

@NgModule({
  imports: [
    RouterModule.forChild(
        [
            { path: 'topology',  component: TopologyComponent }
        ]
    )
  ],
  exports: [
    RouterModule
  ]
})
export class TopologyRoutingModule { }