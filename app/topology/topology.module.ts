import { NgModule }      from '@angular/core';
import { TopologyRoutingModule } from './topology-routing.module';

import { TopologyService } from './topology.service';
import { TopologyComponent }    from './topology.component';
import { TopologyDetailComponent }    from './topology-detail.component';

@NgModule({
  imports: [
    TopologyRoutingModule
  ],
  declarations: [
    TopologyComponent,
    TopologyDetailComponent
  ],
  providers: [
    TopologyService
  ]
})
export class TopologyModule {}
