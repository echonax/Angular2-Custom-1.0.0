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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var event_service_1 = require("./event.service");
var EventDetailComponent = (function () {
    function EventDetailComponent(route, router, es) {
        this.route = route;
        this.router = router;
        this.es = es;
    }
    EventDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            console.log(1, params);
            var name = params['name'];
            _this.event = _this.es.getEvent(name);
            //let id = +params['id']; // (+) converts string 'id' to a number
            //this.event = this.es.getEvent(id);
        });
    };
    return EventDetailComponent;
}());
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