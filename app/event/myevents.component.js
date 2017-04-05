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
let MyEventsComponent = class MyEventsComponent {
    constructor(router, es) {
        this.router = router;
        this.es = es;
        this.title = 'Tour of Events';
        this.events = [];
    }
    ngOnInit() {
        this.es.getMyEvents().toPromise()
            .then((res) => {
            this.events = res;
            console.log(this.events);
        });
    }
    onSelect(event) {
        //this.selectedEvent = event;
        this.router.navigate(['/events/myevent', event.eventid]);
    }
};
MyEventsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'event',
        templateUrl: './myevents.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, event_service_1.EventService])
], MyEventsComponent);
exports.MyEventsComponent = MyEventsComponent;
//# sourceMappingURL=myevents.component.js.map