import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TopologyService } from './topology.service';

@Component({
  moduleId: module.id,
  selector: 'topology-detail',
  templateUrl: './topology-detail.component.html'
})
export class TopologyDetailComponent {
  constructor( private router: Router ) { }

}