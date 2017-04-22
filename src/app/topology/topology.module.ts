import { NgModule }      from '@angular/core';
import { TopologyRoutingModule } from './topology-routing.module';

import { TopologyService } from './topology.service';
import { TopologyComponent }    from './topology.component';

@NgModule({
  imports: [
    TopologyRoutingModule
  ],
  declarations: [
    TopologyComponent
  ],
  providers: [
    TopologyService
  ]
})
export class TopologyModule {}
