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
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const event_routing_module_1 = require("./event-routing.module");
const event_service_1 = require("./event.service");
const myevents_component_1 = require("./myevents.component");
const events_component_1 = require("./events.component");
const event_detail_component_1 = require("./event-detail.component");
const event_create_component_1 = require("./event-create/event-create.component");
let EventModule = class EventModule {
};
EventModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            event_routing_module_1.EventRoutingModule
        ],
        declarations: [
            myevents_component_1.MyEventsComponent,
            events_component_1.EventsComponent,
            event_detail_component_1.EventDetailComponent,
            event_create_component_1.EventCreateComponent,
        ],
        providers: [
            event_service_1.EventService
        ]
    }),
    __metadata("design:paramtypes", [])
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=event.module.js.map