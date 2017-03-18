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
const enums_1 = require("../../enums");
const event_service_1 = require("../event.service");
let EventCreateComponent = class EventCreateComponent {
    constructor(router, es) {
        this.router = router;
        this.es = es;
        this.types = [];
        this.model = new event_service_1.Event("", enums_1.EventType.Any);
        this.submitted = false;
        for (var enumMember in enums_1.EventType) {
            if (isNaN(parseInt(enumMember))) {
                this.types.push(enumMember);
            }
        }
        this.model.type = this.types[0];
    }
    onSubmit() {
        this.submitted = true;
        this.es.createNewEvent(this.model);
    }
    newEvent() {
        this.model = new event_service_1.Event("", enums_1.EventType.Any);
    }
    onSelect(event) {
        //this.selectedEvent = event;
        //this.router.navigate(['/events', event.id]);
    }
};
EventCreateComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'event',
        templateUrl: './event-create.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, event_service_1.EventService])
], EventCreateComponent);
exports.EventCreateComponent = EventCreateComponent;
//# sourceMappingURL=event-create.component.js.map