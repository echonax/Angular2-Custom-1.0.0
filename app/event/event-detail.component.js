"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const event_service_1 = require("./event.service");
require("rxjs/add/operator/toPromise");
let EventDetailComponent = class EventDetailComponent {
    constructor(route, router, es) {
        this.route = route;
        this.router = router;
        this.es = es;
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            if (params['id']) {
                this.es.getEvent(params['id']).toPromise()
                    .then((res) => {
                    this.event = res[0];
                });
            }
            else {
                alert("something's wrong with this event");
            }
        });
    }
    onAttend() {
        //this.es.addAttendence(this.event.eventid);
    }
    onCancelAttention() {
    }
};
EventDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'event-detail',
        templateUrl: './event-detail.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, event_service_1.EventService])
], EventDetailComponent);
exports.EventDetailComponent = EventDetailComponent;
//# sourceMappingURL=event-detail.component.js.map