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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const http_1 = require('@angular/http');
const app_routing_module_1 = require('./app-routing.module');
const app_component_1 = require('./app.component');
const login_component_1 = require('./login/login.component');
const page_not_found_component_1 = require('./login/page-not-found.component');
const home_component_1 = require('./home/home.component');
const auth_guard_service_1 = require('./auth-guard.service');
const auth_service_1 = require('./auth.service');
const topology_module_1 = require('./topology/topology.module');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            //TweetModule,
            //EventModule,
            topology_module_1.TopologyModule,
            app_routing_module_1.AppRoutingModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            page_not_found_component_1.PageNotFoundComponent,
            home_component_1.HomeComponent
        ],
        providers: [auth_guard_service_1.AuthGuard, auth_service_1.AuthService],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map