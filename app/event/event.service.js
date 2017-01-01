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
var Event = (function () {
    function Event(name, type, size, city, district, id) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.city = city;
        this.district = district;
        this.id = id;
    }
    return Event;
}());
exports.Event = Event;
exports.EVENTS = [];
var EventService = (function () {
    function EventService() {
    }
    EventService.prototype.getEvents = function () { return exports.EVENTS; };
    EventService.prototype.getEvent = function (name) {
        var res = exports.EVENTS.find(function (event) { return event.name == name; });
        return res;
    };
    EventService.prototype.createNewEvent = function (data) {
        var found = false;
        for (var i = 0; i < exports.EVENTS.length; i++) {
            if (exports.EVENTS[i].name == data.name) {
                exports.EVENTS[i] = data;
                found = true;
                break;
            }
        }
        if (!found) {
            exports.EVENTS.push(data);
        }
    };
    return EventService;
}());
EventService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map