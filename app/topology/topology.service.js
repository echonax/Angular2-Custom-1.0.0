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
exports.topoConfig = {
    defaultSwitchFillColor: "#7bb7ef",
    defaultSwitchStrokeColor: "blue",
    defaultSwitchRadius: 20,
    defaultPathColor: "green",
    defaultLinkColor: "#7bb7ef",
    disabledNodeLinkColor: "red",
    defaultLinkWidth: 9,
    defaultHostRadius: 4,
    selectedHostRadius: 10,
    defaultHostLinkWidth: 3,
    defaultHostFillColor: "#c6dbef",
    defaultHostStrokeColor: "blue"
};
var TopologyService = (function () {
    function TopologyService() {
    }
    TopologyService.prototype.convert = function (data) {
        var _this = this;
        var topology = data;
        var d3TopologyJSON = {
            "nodes": [],
            "links": []
        };
        if ((topology != null) && (topology.Switches != null)) {
            var legacyCount = 1;
            topology.Switches.forEach(function (sw, i) {
                return d3TopologyJSON.nodes.push({
                    "id": sw.id,
                    "type": "Switch",
                    "name": sw.name,
                    "status": sw.status,
                    "required": sw.required,
                    "_children": [],
                    "children": [],
                    "colorCode": sw.colorCode,
                    "fixed": sw.fixed,
                    "x": sw.x,
                    "y": sw.y
                });
            });
        }
        if (topology && (topology.Hosts != null)) {
            topology.Hosts.forEach(function (host, i) {
                d3TopologyJSON.nodes.push({
                    "id": host.id,
                    "type": "Host",
                    "name": host.name,
                    "hostName": host.hostHWAddress,
                    "hostIpv4Address": host.hostIpv4Address,
                    "switchName": host.switchName,
                    "required": host.required,
                    "status": host.status,
                    "colorCode": host.colorCode,
                    "x": host.x,
                    "y": host.y
                });
            });
            var hostLink_1 = {};
            topology.Hosts.forEach(function (host, i) {
                hostLink_1 = {
                    linktype: "hostlink",
                    order: 1,
                    source: _this.getNodeIndexByNodeAttr("id", host, "id", d3TopologyJSON.nodes),
                    target: _this.getNodeIndexByNodeAttr("switchName", host, "name", d3TopologyJSON.nodes)
                };
                d3TopologyJSON.links.push(hostLink_1);
            });
        }
        if (topology && (topology.Links != null)) {
            topology.Links.forEach(function (link, i) {
                return d3TopologyJSON.links.push({
                    "id": link.id,
                    "type": "Link",
                    "source": _this.getNodeIndexByNodeAttr("srcName", link, "name", d3TopologyJSON.nodes),
                    "target": _this.getNodeIndexByNodeAttr("destName", link, "name", d3TopologyJSON.nodes),
                    "destPortId": link.destPortId,
                    "srcPortId": link.srcPortId,
                    "blocked": link.blocked,
                    "required": link.required,
                    "status": link.status,
                    "order": link.order,
                    "colorCode": link.colorCode,
                    "linkWeight": link.linkWeight,
                    "customData": link.customData
                });
            });
        }
        return d3TopologyJSON;
    };
    TopologyService.prototype.getNodeIndexByNodeAttr = function (nodeAttr, node, listAttr, nodeList) {
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i][listAttr] == node[nodeAttr]) {
                return i;
            }
        }
    };
    TopologyService.color = function (d) {
        // inside color
        if (d.type === "Host") {
            return exports.topoConfig.defaultHostFillColor;
        }
        else if (d.type === "Switch") {
            return exports.topoConfig.defaultSwitchFillColor;
        }
        else {
            return "#d6dbef";
        }
    };
    TopologyService.strokeWidth = function (d) {
        return "2";
    };
    TopologyService.strokeColor = function (d) {
        if (d.status === 0) {
            if (d.type === "Switch") {
                return exports.topoConfig.defaultSwitchStrokeColor;
            }
            else if (d.type === "Host") {
                return exports.topoConfig.defaultHostStrokeColor;
            }
            else {
                return d.colorCode;
            }
        }
        else if (d.status === 1) {
            return "green";
        }
        else if (d.status === 2) {
            return "red";
        }
        else if (d.status === 3) {
            return "#926E02";
        }
        else {
            return "black";
        }
    };
    TopologyService.linkWidth = function (d) {
        if (d.source.type === "Switch" && d.target.type === "Switch") {
            return exports.topoConfig.defaultLinkWidth;
        }
        else {
            return exports.topoConfig.defaultHostLinkWidth;
        }
    };
    TopologyService.initShortestPathCalculations = function (host1, host2, graph) {
        var sw1, sw2;
        graph.nodes.forEach(function (v, i) {
            //this cleans the green path from previous attempts otherwise if you disable a link and try again its other path may still remain
            if (v.colorCode == exports.topoConfig.defaultPathColor) {
                v.colorCode = exports.topoConfig.defaultLinkColor;
            }
            v.explored = false;
            if (v.name == host1.switchName) {
                sw1 = v;
            }
            else if (v.name == host2.switchName) {
                sw2 = v;
            }
        });
        graph.links.forEach(function (v, i) {
            //RESETING FOR PREVIOUS SP ATTEMPTS
            if (v.colorCode == exports.topoConfig.defaultPathColor) {
                v.colorCode = exports.topoConfig.defaultLinkColor;
            }
        });
        return this.shortestPathFunc(sw1, sw2, graph);
    };
    TopologyService.shortestPathFunc = function (node1, node2, graph) {
        var _this = this;
        node1.explored = true;
        node1.cost = 0;
        var shortestPathArray = [];
        var cost = [];
        shortestPathArray.push(node1);
        while (shortestPathArray.length != 0) {
            var workingNode = shortestPathArray.shift();
            var currentLinks = this.activeLinkFinder(workingNode, graph);
            //if no paths can be found due to root hopping then clear the blocked ones
            if (currentLinks.length == 0) {
                graph.links.forEach(function (v, i) {
                    if (v.blocked != 0) {
                        v.blocked = 0;
                    }
                });
                currentLinks = this.activeLinkFinder(workingNode, graph);
            }
            //breadth first search
            currentLinks.forEach(function (v, i) {
                if (v.source.name != workingNode.name && v.source.explored != true) {
                    _this.switchFinder(v.source.name, graph).cost = v.target.cost + 1;
                    _this.switchFinder(v.source.name, graph).explored = true;
                    shortestPathArray.push(_this.switchFinder(v.source.name, graph));
                    cost[v.source.name] = {
                        "parent": workingNode.name,
                        "cost": v.target.cost + 1
                    };
                }
                else if (v.target.name != workingNode.name && v.target.explored != true) {
                    _this.switchFinder(v.target.name, graph).cost = v.source.cost + 1;
                    _this.switchFinder(v.target.name, graph).explored = true;
                    shortestPathArray.push(_this.switchFinder(v.target.name, graph));
                    cost[v.target.name] = {
                        "parent": workingNode.name,
                        "cost": v.source.cost + 1
                    };
                }
            });
        }
        var pathArray = this.thePathArray(node1, node2, cost);
        //you can delete this if
        if (pathArray == "Edge") {
            return "Edge";
        }
        return pathArray;
    };
    TopologyService.thePathArray = function (begNode, endNode, costTable) {
        var pathArray = [];
        var pointer = endNode.name;
        while (pointer != begNode.name) {
            for (var key in costTable) {
                //you can delete this if
                if (pointer != begNode.name && !(costTable.hasOwnProperty(pointer))) {
                    console.log("key doesnt exists, this is an unaccessible edge node");
                    return "Edge";
                }
                else if (key == pointer) {
                    pathArray.push(key);
                    pointer = costTable[key].parent;
                }
            }
        }
        ;
        return pathArray;
    };
    TopologyService.activeLinkFinder = function (node, graph) {
        var spLinkArray = [];
        graph.links.forEach(function (v, i) {
            if (v.type == "Link") {
                if (v.source.name == node.name && v.source.blocked != 1 && v.blocked != 1) {
                    spLinkArray.push(v);
                }
                else if (v.target.name == node.name && v.target.blocked != 1 && v.blocked != 1) {
                    spLinkArray.push(v);
                }
            }
        });
        return spLinkArray;
    };
    TopologyService.switchFinder = function (switchName, graph) {
        for (var i = 0; i < graph.nodes.length; i++) {
            if (switchName == graph.nodes[i].name) {
                return graph.nodes[i];
            }
        }
    };
    TopologyService.topologyFindSwitchDTOById = function (switchName, graph) {
        for (var i = 0; i < graph.nodes.length; i++) {
            if (switchName == graph.nodes[i].id) {
                return graph.nodes[i];
            }
        }
    };
    TopologyService.brokenLinkFinder = function (node, graph) {
        var spLinkArray = [];
        graph.links.forEach(function (v, i) {
            if (v.type == "Link") {
                if (v.source.name == node.name && v.source.blocked == 1) {
                    spLinkArray.push(v);
                }
                else if (v.target.name == node.name && v.target.blocked == 1) {
                    spLinkArray.push(v);
                }
            }
        });
        return spLinkArray;
    };
    return TopologyService;
}());
TopologyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], TopologyService);
exports.TopologyService = TopologyService;
//# sourceMappingURL=topology.service.js.map