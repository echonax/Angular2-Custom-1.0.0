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
const config_1 = require("../config");
class Event {
    constructor(eventname, eventtype, publicity, owner, info, eventid) {
        this.eventname = eventname;
        this.eventtype = eventtype;
        this.publicity = publicity;
        this.owner = owner;
        this.info = info;
        this.eventid = eventid;
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
        return this.http.post(config_1.config.backend_url + "/myevents/get", { username: this.as.user }, options)
            .map((res) => res.json())
            .catch((err) => err);
    }
    getMyEventSubscribers(eventid) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.config.backend_url + "/myevents/getSubscribers", { eventid: eventid }, options)
            .map((res) => res.json())
            .catch((err) => err);
    }
    getEvents() {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.config.backend_url + "/otherevents/get", { username: this.as.user }, options)
            .map((res) => res.json())
            .catch((err) => err);
    }
    getEvent(id) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.config.backend_url + "/event/get", { id: id }, options)
            .map((res) => res.json())
            .catch((err) => err);
    }
    createNewEvent(eventtype, eventname, info) {
        let model = { owner: this.as.user, eventtype: eventtype, eventname: eventname, publicity: enums_1.EventPublicity.PUBLIC, info: info };
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.config.backend_url + "/event/create", model, options)
            .map((res) => { return res; })
            .catch((err) => { return err; });
    }
    editEvent(eventtype, name, publicity, info, eventid) {
        let model = { eventtype: eventtype, eventname: name, publicity: enums_1.EventPublicity.PUBLIC, info: info, eventid: eventid };
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.config.backend_url + "/event/edit", model, options)
            .map((res) => { return res; })
            .catch((err) => { return err; });
    }
    addAttendence(eventid) {
        let data = { eventid: eventid, user: this.as.user, attention: enums_1.EventSubscriptionStatus.SUBSCRIBED };
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.config.backend_url + "/event/addAttendence", data, options)
            .map((res) => { return res; })
            .catch((err) => { return err; });
    }
    cancelAttendence(eventid) {
        let data = { eventid: eventid, user: this.as.user };
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.config.backend_url + "/event/cancelAttendence", data, options)
            .map((res) => { return res; })
            .catch((err) => { return err; });
    }
    changeAttendence(eventid, username, status) {
        let data = { eventid: eventid, username: username, status: status };
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.config.backend_url + "/event/changeAttendenceStatus", data, options)
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