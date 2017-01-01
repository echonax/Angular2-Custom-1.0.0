import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TopologyService } from './topology.service';

@Component({
  moduleId: module.id,
  selector: 'topology',
  templateUrl: './topology.component.html'
})
export class TopologyComponent {
  constructor( private router: Router ) { }

}