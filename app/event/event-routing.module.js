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
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const event_component_1 = require('./event.component');
const event_detail_component_1 = require('./event-detail.component');
const event_create_component_1 = require('./event-create/event-create.component');
let EventRoutingModule = class EventRoutingModule {
};
EventRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild([
                {
                    path: '',
                    component: event_component_1.EventComponent,
                    data: { title: 'Event List' },
                    children: [] //need router-outlet for this
                },
                {
                    path: 'create',
                    component: event_create_component_1.EventCreateComponent
                },
                {
                    path: ':name',
                    component: event_detail_component_1.EventDetailComponent
                }
            ])
        ],
        exports: [
            router_1.RouterModule
        ]
    }), 
    __metadata('design:paramtypes', [])
], EventRoutingModule);
exports.EventRoutingModule = EventRoutingModule;
//# sourceMappingURL=event-routing.module.js.map