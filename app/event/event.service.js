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
const http_1 = require("@angular/http");
const auth_service_1 = require("../auth.service");
const enums_1 = require("../enums");
class Event {
    constructor(name, type, size, city, district, id) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.city = city;
        this.district = district;
        this.id = id;
    }
}
exports.Event = Event;
let EventService = class EventService {
    constructor(http, as) {
        this.http = http;
        this.as = as;
    }
    getMyEvents() {
        //if(!this.as.user){return "err"}
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("http://localhost:9999/myevents/get", { username: this.as.user }, options)
            .map((res) => res.json())
            .catch((err) => err);
    }
    getOtherEvents() {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("http://localhost:9999/otherevents/get", { username: this.as.user }, options)
            .map((res) => res.json())
            .catch((err) => err);
    }
    getEvent(name) {
        //let res = EVENTS.find(event => event.name == name);
        //return res;
    }
    createNewEvent(data) {
        let model = { owner: this.as.user, eventtype: data.type, eventname: data.name, publicity: enums_1.EventPublicity.PUBLIC };
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("http://localhost:9999/event/create", model, options)
            .map((res) => { return res; })
            .catch((err) => { return err; });
    }
};
EventService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, auth_service_1.AuthService])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map