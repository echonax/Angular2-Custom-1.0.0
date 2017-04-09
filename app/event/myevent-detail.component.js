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
const enums_1 = require("../enums");
require("rxjs/add/operator/toPromise");
let MyEventDetailComponent = class MyEventDetailComponent {
    constructor(route, router, es) {
        this.route = route;
        this.router = router;
        this.es = es;
        this.EventSubscriptionStatus = enums_1.EventSubscriptionStatus;
        this.EventPublicity = enums_1.EventPublicity;
        this.editModeFlag = false;
        this.types = [];
        this.publicities = [];
        for (var enumMember in enums_1.EventType) {
            if (isNaN(parseInt(enumMember))) {
                this.types.push(enumMember);
            }
        }
        for (var enumMember in enums_1.EventPublicity) {
            if (isNaN(parseInt(enumMember))) {
                this.publicities.push(enumMember);
            }
        }
        //this.model.eventtype = this.types[0];
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            if (params['id']) {
                this.es.getEvent(params['id']).toPromise()
                    .then((res) => {
                    this.event = res[0];
                    this.subscribers = this.es.getMyEventSubscribers(this.event.eventid).toPromise();
                });
            }
            else {
                alert("something's wrong with this event");
            }
        });
    }
    changeStatus(mouseevent, user, status) {
        this.es.changeAttendence(this.event.eventid, user, status).toPromise()
            .then((res) => {
            if (res._body == "SUCCESS") {
                this.subscribers = this.es.getMyEventSubscribers(this.event.eventid).toPromise();
            }
        });
    }
    onEdit() {
        this.stringifiedEvent = JSON.stringify(this.event);
        this.editModeFlag = true;
    }
    onSave() {
        this.editModeFlag = false;
        this.es.editEvent(this.event.eventtype, this.event.eventname, this.event.publicity, this.event.info, this.event.eventid).toPromise()
            .then((res) => {
            if (res._body == "SUCCESS") {
            }
            else {
                alert("couldnt edit event");
            }
        });
    }
    onCancel() {
        this.event = JSON.parse(this.stringifiedEvent);
        this.editModeFlag = false;
    }
};
MyEventDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'myevent-detail',
        templateUrl: './myevent-detail.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, event_service_1.EventService])
], MyEventDetailComponent);
exports.MyEventDetailComponent = MyEventDetailComponent;
//# sourceMappingURL=myevent-detail.component.js.map