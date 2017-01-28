import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TopologyService, topoConfig } from './topology.service';
import { turkeyJSON } from './JSONs';

import * as d3 from 'd3';

@Component({
  moduleId: module.id,
  selector: 'topology',
  templateUrl: './topology.component.html'
})
export class TopologyComponent implements OnInit, OnDestroy, AfterViewInit {
    //svg
    svg:any;
    svgChildren:any;
    allOutsideLinks:any;
    switchText:any;
    insideSwitch:any;
    insideSwitchLinks:any;
    outsideHosts:any;
    roothoppingCheckbox:any;
    //jsons
    currentJSON:any;
    selectedCounter:number;
    div:any;
    //flags
    addFlag:boolean;
    linkFlag:boolean;
    isZoomed:boolean;
    whatToAdd:string;
    cursor:any;
    roothoppingCheckboxState:any;

    //SP calculation
    nodeBeg:any;
    nodeEnd:any;
    cost:any;

    //add mechanics
    selectedNodes:Array<any>;

    //interval
    dynamicR:any;

    //zoom
    zoom:any;
    view:any;

    public socket:any;
    host;
    isAddMenuHidden = true;
    svg_g:any;

    constructor(public dc:TopologyService, public _element: ElementRef) {
        this.host = d3.select(this._element.nativeElement);

        this.selectedNodes = [];
        this.whatToAdd = "switch";
        this.selectedCounter = 0;
        this.cursor = null;
        this.isZoomed = false;
    }

    /*radioClick(e){
        this.whatToAdd = e.target.value;

        switch (this.whatToAdd) {
            case 'switch':
                this.linkFlag = false;
                this.addCursor();
                break;
            case 'host':
                this.linkFlag = false;
                this.addCursor();
                break;
            case 'link':
                this.linkFlag = true;
                d3.selectAll(".cursor").remove();
                break;
            default:
                d3.select('.cursor').attr('r', 20);
        }

        if (e.target.value == 'link') {
            d3.select('.info').style("opacity", 1);
        } else {
            d3.select('.info').style("opacity", 0);
        }
    }*/

    ngOnInit() {

        var that = this;
        this.addFlag = false;

        //this.svg.append("rect")
        //    .attr("class", "background")
        //    .attr("width", 1024)
        //    .attr("height", 500);        
    }

    ngAfterViewInit() {
        var that = this;
        this.jQuerySelectorsAndDefinitions();
        
        this.div = this.host.append("div")
            .attr("class", "topotooltip");

        this.zoom = d3.behavior.zoom()
            .translate([0, 0])
            .scale(1)
            .scaleExtent([.5, 20])
            .on("zoom", this.zoomed.bind(this));

        this.svg = d3.select("svg")
            .on("mousemove", function () {
                if (that.cursor) {
                    that.cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
                }
            })
            
        this.svg.insert("image",":first-child")
            .attr("xlink:href", "./app/topology/tr.svg")
            .attr("width", 1024)
            .attr("height", 500);

        this.svgChildren = this.svg
            .append('g')
            .attr('class', 'turkey-svg-g');

        this.svg.call(this.zoom)
            .on("mousedown.zoom", null)
            .on("mousewheel.zoom", null)
            .on("mousemove.zoom", null)
            .on("DOMMouseScroll.zoom", null)
            .on("dblclick.zoom", null)
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null)
            .on("wheel.zoom", null)
            .on('mousedown.drag', null);


        //INIT
        this.currentJSON = this.dc.convert(JSON.parse(JSON.stringify(turkeyJSON)));

        this.currentJSON.links.forEach((d:any)=> {
            d.source = this.currentJSON.nodes[d.source];
            d.target = this.currentJSON.nodes[d.target];
        });

        this.render(this.currentJSON);
    }

    shortestPathClick(){
        this.shortestPathFunc();
    }

    changePathClick(){
        this.changePathFunc();
    }

    /*addModeClick(){
        var that = this;

        d3.select('.add-menu').toggle(0, ()=> {
            if (!this.addFlag) {
                this.deSelectSelectedHosts();
                this.cursor = this.svgChildren.append("circle")
                    .attr("r", function () {
                        if (that.whatToAdd == 'switch') {
                            return 20;
                        }
                        else if (that.whatToAdd == 'host') {
                            return 4;
                        }
                    })
                    .attr("transform", "translate(-100,-100)")
                    .attr("class", "cursor");

                this.addFlag = true;

                d3.select('.turkey-svg').on('mousedown', function () {

                    if (that.addFlag && !that.linkFlag) {

                        var point = d3.mouse(this);
                        var node;
                        switch (that.whatToAdd) {
                            case 'switch':
                                node = {
                                    x: point[0],
                                    y: point[1],
                                    colorCode: 'B',
                                    type: 'Switch',
                                    name: 'switchName',
                                    status: 0
                                };
                                that.currentJSON.nodes.push(node);
                                break;
                            case 'host':
                                node = {
                                    x: point[0],
                                    y: point[1],
                                    colorCode: 'B',
                                    type: 'Host',
                                    status: 0
                                };
                                that.currentJSON.nodes.push(node);
                                break;
                            case 'link':
                                //let him choose 2 nodes to connect
                                break;
                            default:
                                console.log('default');
                        }

                        that.svgChildren.selectAll("*").remove();
                        that.render(that.currentJSON);
                        that.addCursor();
                    }
                });

            } else {//while closing

                this.deSelectSelectedHosts();

                this.selectedNodes = [];
                d3.select(".node").classed("selected", false);
                d3.select(".md-radiobtn[value='switch']").trigger("click");
                //destroy event
                this.svg.on('mousedown', null);
                this.addFlag = false;
                d3.selectAll(".cursor").remove();
            }

        });

        d3.select('.info').style("opacity", 0);
    }*/
    
    resetClick(){
        this.resetTopologyFunc();
    }

    jQuerySelectorsAndDefinitions(){
        this.roothoppingCheckbox = d3.select('.roothopping');
        this.roothoppingCheckboxState = this.roothoppingCheckbox.property("checked");
        this.allOutsideLinks = d3.select('.outside-link');
        this.switchText = d3.select('g.switchnode text');
        this.outsideHosts = d3.select('.hostnode');
        this.insideSwitch = d3.select('.insideswitch');
        this.insideSwitchLinks = d3.select('.inside-switch-link');

        this.insideSwitch.style("opacity", 0);
    }

    /*addCursor() {
        this.cursor = this.svgChildren.append("circle")
            .attr("r", ()=> {
                if (this.whatToAdd == 'switch') {
                    return topoConfig.defaultSwitchRadius;
                }
                else if (this.whatToAdd == 'host') {
                    return topoConfig.defaultHostRadius;
                }
            })
            .attr("transform", "translate(-100,-100)")
            .attr("class", "cursor");
    }*/

    deSelectSelectedHosts() {
        //because only hosts could be marked as selected in this scenario
        this.selectedCounter = 0;
        if (d3.select('.node').classed('selected')) {
            d3.selectAll('.selected').data().filter(function (d:any):any {
                if (d.size == topoConfig.selectedHostRadius) {
                    d.size = topoConfig.defaultHostRadius;
                }
            });
            d3.selectAll('.selected').select('circle').transition().attr('r', topoConfig.defaultHostRadius);
            d3.select('.node').classed('selected', false);
        }

    }

    colorTheGraph(begNode, pathArray, graph) {

        //shift beginning node to front
        pathArray.push(begNode.switchName);
        var nodes = graph.nodes;
        var links = graph.links;

        //change the color code of the nodes
        for (var i = 0; i < pathArray.length; i++) {
            for (var key in nodes) {
                if (nodes[key].name == pathArray[i]) {
                    nodes[key].colorCode = topoConfig.defaultPathColor;
                }
            }
        }
        //change the color code of the links
        for (var i = 0; i < pathArray.length - 1; i++) {
            for (var key in links) {
                if (( links[key].source.name == pathArray[i] && links[key].target.name == pathArray[i + 1] ) || ( links[key].target.name == pathArray[i] && links[key].source.name == pathArray[i + 1] )) {
                    links[key].colorCode = topoConfig.defaultPathColor;
                }
            }
        }
        return graph;
    }

    /*addLinkBetweenNodes(twoNodeArrayToJoin) {

        var node1 = twoNodeArrayToJoin[0];
        var node2 = twoNodeArrayToJoin[1];

        if (node1.type == 'Switch' && node2.type == 'Switch') {
            var link = {
                blocked: 0,
                colorCode: "B",
                customData: 1,
                destName: node2.name,
                destPortId: 1,
                linkId: 2,
                linkWeight: "B",
                order: 1,
                selfLink: false,
                source: node1,
                srcName: node1.name,
                srcPortId: 2,
                status: 0,
                target: node2,
                type: "Link"
            }
            this.currentJSON.links.push(link);
        } else if (node1.type == 'Host' && node2.type == 'Switch') {
            node1.switchName = node2.name;
            if (node2.children) {
                node2.children.push(node1);
            } else {
                node2.children = [{node1}];
            }

            var link3 = {
                colorCode: "B",
                order: 1,
                source: node1,
                target: node2,
            };
            this.currentJSON.links.push(link3);
        } else if (node1.type == 'Switch' && node2.type == 'Host') {
            node2.switchName = node1.name;
            if (node1.children) {
                node1.children.push(node2);
            } else {
                node1.children = [{node2}];
            }
            var link2 = {
                colorCode: "B",
                order: 1,
                source: node2,
                target: node1,
            };
            this.currentJSON.links.push(link2);
        }

        this.svgChildren.selectAll("*").remove();
        this.render(this.currentJSON);
    }*/

    changePathFunc() {
        if (this.selectedCounter == 2) {
            d3.selectAll('line')
                .filter(function (d:any, i):any {
                    if (d.colorCode == topoConfig.defaultPathColor) {
                        d.colorCode = topoConfig.defaultLinkColor;
                        d.blocked = 1;
                    }
                });
            this.svgChildren.selectAll("*").remove();
            this.shortestPathFunc();
        }else{
            alert('There must be a path first.');
        }
    }

    resetTopologyFunc() {
        this.isZoomed = false;
        this.selectedNodes = [];
        this.nodeBeg = null;
        this.nodeEnd = null;
        this.roothoppingCheckboxState = this.roothoppingCheckbox.property('checked', false);
        clearTimeout(this.dynamicR);
        this.selectedCounter = 0;
        this.svgChildren.selectAll("*").remove();
        //svg related, after the cleaning
        // this.svg.append("image")
        //     .attr("xlink:href", "./app/topology/tr.svg")
        //     .attr("width", 1024)
        //     .attr("height", 500);

        //then render
        this.currentJSON = this.dc.convert(JSON.parse(JSON.stringify(turkeyJSON)));
        this.currentJSON.links.forEach((d:any)=> {
            d.source = this.currentJSON.nodes[d.source];
            d.target = this.currentJSON.nodes[d.target];
        });
        
        this.render(this.currentJSON);

        this.jQuerySelectorsAndDefinitions();
    }

    shortestPathFunc() {

        if (this.selectedCounter == 2) {
            this.svgChildren.selectAll("*").remove();
            var pathsToBeColored = TopologyService.initShortestPathCalculations(this.nodeBeg, this.nodeEnd, this.currentJSON);

            //you can delete this if but different path wont work on a destination node whose links have all been blocked
            if (pathsToBeColored == "Edge") {
                this.currentJSON.links.forEach( function (v, i) {
                    if (v.blocked != 0) {
                        v.blocked = 0;
                    }
                });
                pathsToBeColored = TopologyService.initShortestPathCalculations(this.nodeBeg, this.nodeEnd, this.currentJSON);
            }

            var newGraph = this.colorTheGraph(this.nodeBeg, pathsToBeColored, this.currentJSON);
            this.render(newGraph);
        } else {
            alert("You must choose 2 nodes to calculate a path (little ones)");
        }

        if (this.roothoppingCheckboxState) {
            this.dynamicR = setTimeout(()=> {
                this.changePathFunc();
            }, 4000);
        }
    }

    ngOnDestroy() {
        this.svgChildren.selectAll("*").remove();
        d3.select('.topotooltip').remove();
    }

    render(graph) {

        var that = this;

        var link = this.svgChildren.append("g")
            .attr("class", "path-link")
            .selectAll("line")
            .style('stroke', "black")
            .style("stroke-width", (d)=> {
                return TopologyService.linkWidth(d);
            })
            .data(graph.links, (d)=> {
                if (d.source && d.source.id) {
                    return d.source.id + "-" + d.target.id;
                } else {
                    return d.source + "-" + d.target;
                }
            });

        let linkEnter = link.enter().append("line")
            .attr("class", function (d) {
                if (  (d.source && d.source.status == "1") || ( d.target && d.target.status == "1") ){
                    return "inside-switch-link";
                } else {
                    return "outside-link";
                }
            })
            .on("contextmenu", function (d, i) {
                var dataset = [{
                    title: 'Remove Node',
                    data: d,
                    action: ""
                }];

                that.setContextMenu(that, dataset, d, i, this);
            })
            .style('stroke', (d)=> {
                if (d.source.type === "Switch" && d.target.type === "Switch") {
                    return TopologyService.strokeColor(d);
                } else {
                    return topoConfig.defaultLinkColor;
                }
            })
            .style("stroke-width", (d)=> {
                return TopologyService.linkWidth(d);
            })
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });
        
        link.exit().remove();

        //var drag = d3.behavior.drag()
        //    .origin(function(d) { return d; })
        //    .on('drag', function (d,i) {
        //        d.x = d3.event.x;
        //        d.y = d3.event.y;
        //        d3.select(this).attr("transform", function (d, i) {
        //            return "translate(" + [d.x,d.y] + ")";
        //        });
        //        link.filter(function(l) { return l.source === d; }).attr("x1", d.x).attr("y1", d.y);
        //        link.filter(function(l) { return l.target === d; }).attr("x2", d.x).attr("y2", d.y);
        //    });

        var node = this.svgChildren.selectAll("g.node").data(graph.nodes);

        node.select("circle")
            .attr("r", function (d:any):string|number {

                if (d.colorCode === "E") {
                    return "10";
                } else if (d.type === "Internet") {
                    return "images/internet_cloud.png";
                } else if (d.type === "Switch") {
                    if (d.status == "0") {
                        return 20;
                    } else if (d.status == 1) {
                        return 1.7;
                    }

                } else {
                    return 4.5;
                }

            })
            .style("stroke", TopologyService.strokeColor)
            .style("stroke-width", TopologyService.strokeWidth);

        node.select("text").attr("text-anchor", "middle")
            .attr("dy", function (d:any) {
                if (d.type == "Switch") {
                    return "0.2em";
                } else {
                    return "-0.6em";
                }
            })
            .text(function (d:any) {
                  return d.name;
            });

        var nodeEnter = node.enter().append("g")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")";
            })
            // .call(drag)
            .attr("class", function (d) {
                if (d.type === "Host") {
                    return "hostnode";
                } else if (d.type === "Switch") {
                    if (d.status == "1") {
                        return "insideswitch";
                    } else {
                        return "switchnode";
                    }
                }
                return "node";
            })
            .on("contextmenu", function (d, i) {
                var dataset = [{
                    title: 'Remove Node',
                    data: d,
                    action: ""
                }];

                that.setContextMenu(that, dataset, d, i, this);
            })
            .attr("id", function (d, i) {
                return "node" + i
            })
            .on("click", function (d:any) {

                if (that.whatToAdd != 'link') {

                    if (d.type === "Host") {

                        if (!d3.select(this).classed("selected") && that.selectedCounter < 2 && d.size != 10) {

                            d3.select(this).classed("selected", true).select("circle").transition().duration(750).attr("r", "10");
                            that.selectedCounter++;

                            if (that.selectedCounter == 1) {
                                that.nodeBeg = d;
                                d.size = 10;
                            } else if (that.selectedCounter == 2) {
                                that.nodeEnd = d;
                                d.size = 10;
                            }
                        } else if (d3.select(this).classed("selected") || d.size == 10) {

                            d3.select(this).classed("selected", false).select("circle").transition().duration(750).attr("r", "4.5");
                            d.size = 4.5;
                            if (that.selectedCounter != 0) {
                                that.selectedCounter--;
                            }
                        } else if (!d3.select(this).classed("selected") && that.selectedCounter == 2) {
                            alert("Please de-select one of the hosts in order to choose another one. Maximum selected host number must be 2");
                        }
                    } /*else if (d.type === "Switch") {

                        var scale = 12;
                        if (!that.isZoomed) {
                            that.zoomedTopology();
                            d3.select(this).select("circle").transition().duration(750)
                                .style("fill-opacity", function (d) {
                                    return 0.5;
                                })
                                .style("stroke-opacity", 0);
                            that.svg.transition().duration(1750).call(that.zoom.translate([1024 / 2 - scale * d.x, 500 / 2 - scale * d.y]).scale(scale).event);
                        } else {
                            that.zoomedTopology();
                            d3.select(this).select("circle").transition().duration(750)
                                .style("fill-opacity", function (d) {
                                    return 1;
                                })
                                .style("stroke-opacity", 1);
                            that.svg.transition().duration(1750).call(that.zoom.translate([0, 0]).scale(1).event);
                        }
                        that.isZoomed = !that.isZoomed;
                    }*/
                } /*else if (that.whatToAdd == 'link') {
                    var selected = d3.select(this).classed("selected");
                    var r:any = d3.select(this).select('circle').attr('r');
                    if (!selected && that.selectedNodes.length == 0) {
                        d3.select(this).classed("selected", true).select("circle").transition().duration(750).attr("r", r * 1.5);
                        that.selectedNodes.push(d);

                    } else if (selected && that.selectedNodes.length == 1) {
                        d3.select(this).classed("selected", false).select("circle").transition().duration(750).attr("r", r * (2 / 3));
                        that.selectedNodes.pop();
                    } else if ((!selected) && that.selectedNodes.length == 1) {
                        d3.select(this).classed("selected", true).select("circle").transition().duration(750).attr("stroke", 'red');
                        that.selectedNodes.push(d);
                        if (that.selectedNodes.length == 2) {
                            that.addLinkBetweenNodes(that.selectedNodes);
                            that.selectedNodes = [];
                            d3.select(".node").classed("selected",false);
                        }
                    } else if (that.selectedNodes.length > 2) {
                        alert("Please de-select one of the hosts in order to choose another one. Maximum selected node number must be 2");
                    }
                }*/
            });

        nodeEnter.append("circle")
            .attr("r", function (d):string|number {
                if (d.type === "Switch") {
                    if (d.status == "1") {
                        return 1.7;
                    }else {
                        return 20;
                    }
                } else {
                    return d.size || 4.5;
                }
            })
            .style("stroke", TopologyService.strokeColor)
            .style("stroke-width", function(d:any){
                if(d.status == '1'){
                    return 0.34;
                }else{
                    return 2;
                }
            })
            .style("fill", TopologyService.color);

        nodeEnter.append("text")
            .attr("text-anchor", "middle")
            //.attr("x", function(d) { return d.x; }) //handled in transform
            //.attr("y", function(d) { return d.y; })
            .attr("dy", (d:any)=> {
                if (d.type == "Switch") {
                    if (d.status == '1') {
                        return "0.25em";
                    } else {
                        return "0.25em";
                    }
                } else {
                    return "-0.6em";
                }
            })
            .text(function (d) {
                return d.type == "Switch" ? d.name : d.id;
            });

        nodeEnter.on("mouseover", that.mouseover.bind(that))
            .on("mousemove", that.mousemove.bind(that))
            .on("mouseout", that.mouseout.bind(that));

        node.exit().remove();

        this.jQuerySelectorsAndDefinitions();
    }

    zoomed() {
        var event:any = d3.event;
        this.svg.style("stroke-width", 1.5 / event.scale + "px");
        this.svg.attr("transform", "translate(" + event.translate + ")scale(" + event.scale + ")");
        console.log("zoom");
    }

    zoomedTopology() {
        if (!this.isZoomed) {
            this.allOutsideLinks.style("opacity", 0);
            this.switchText.style("opacity", 0);
            this.outsideHosts.style("opacity", 0);
            this.insideSwitch.style("opacity", 1);
            this.insideSwitchLinks.style("opacity", 1);

        } else {
            this.allOutsideLinks.style("opacity", 1);
            this.outsideHosts.style("opacity", 1);
            this.switchText.style("opacity", 1);
            this.insideSwitch.style("opacity", 0);
            this.insideSwitchLinks.style("opacity", 0);
        }
    }

    mouseover() {
        return this.div.style("opacity", 0.9);
    }

    mousemove(d:any) {
        if (d.type === "Switch") {

            var over_links = this.svgChildren.selectAll('.link').filter(function (link) {
                return link.source.name !== d.name && link.target.name !== d.name
            });
            over_links.classed('blurred', true);

            return this.div.html("<span class=tool-info-head>Switch Name:</span> " + d.name);
        } else if (d.type === "Host") {
            return this.div.html("<span class=tool-info-head>Switch HW:</span>" + d.switchName );
        }
    }

    mouseout() {
        this.svg.selectAll('.link').classed('blurred', false);
        return this.div.html("");
    }

    setContextMenu(that, dataset, d, data3, data1) {
       
        // var mode, contextDiv;
        d3.selectAll('#contextmenu-node').data(dataset)
            .enter()
            .append('ul')
            .attr('id', 'contextmenu-node');
            //.style("list-style-type", "none");

        d3.event.preventDefault();

        if (d.type == "Switch" || d.type == "Link") {

            //  d3.selectAll("#contextmenu-node").html('');
            d3.select("#contextmenu-node")
                .selectAll('li').data(dataset).enter()
                .append('li');

            var event:any = d3.event;
            // display context menu
            d3.select('#contextmenu-node')
                .style('left', (event.pageX - 2) + 'px')
                .style('top', (event.pageY - 2) + 'px')
                .style('display', 'block')
                //.style('position', 'absolute')   
                .html(function (i, d) {
                    return "<li class='contextmenu-item' > Enable/Disable </li>";
                })
                .on("click", (data:any, i)=> {

                    if (data.data.type == "Switch") {
                        if (data.data.colorCode === topoConfig.disabledNodeLinkColor) { //if disabled, enable it
                            data.data.blocked = 0;
                            data.data.colorCode = topoConfig.defaultSwitchFillColor;
                            var links = TopologyService.activeLinkFinder(data.data, this.currentJSON);
                            links.forEach( (v, i:any)=> {
                                v.colorCode = topoConfig.defaultLinkColor;
                            });
                        } else {//if enabled, disable it
                            data.data.blocked = 1;
                            data.data.colorCode = topoConfig.disabledNodeLinkColor;
                            var links = TopologyService.brokenLinkFinder(data.data, this.currentJSON);
                            links.forEach( (v, i:any)=> {
                                v.colorCode = topoConfig.disabledNodeLinkColor;
                            });
                        }
                    } else if (data.data.type == "Link") {
                        //if already disabled, enable it
                        if (data.data.colorCode === topoConfig.disabledNodeLinkColor) {
                            data.data.blocked = 0;
                            data.data.colorCode = topoConfig.defaultLinkColor;
                            d3.select(".node").classed("selected", false);
                        } else if (data.data.colorCode === topoConfig.defaultLinkColor || data.data.colorCode === topoConfig.defaultPathColor) {//if already enabled, disable it
                            data.data.blocked = 1;
                            data.data.colorCode = topoConfig.disabledNodeLinkColor;
                        }

                    }

                    d3.select('#contextmenu-node').style('display', 'none');
                    this.svgChildren.selectAll("*").remove();
                    this.render(this.currentJSON);
                })
                .on("mouseleave", ()=> {
                        d3.select('#contextmenu-node').remove();
                        // contextDiv = null;
                        // mode = null;
                    }
                );

            d3.event.preventDefault();
        }

    }

    enableDisableClick(){

    }

}

