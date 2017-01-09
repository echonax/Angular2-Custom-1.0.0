import {Injectable} from "@angular/core";

@Injectable()
export class TopologyService{
    public topology;

    constructor(){

    }

    convert(data){

        var topology:any = data;
        var d3TopologyJSON = {
            "nodes": [],
            "links": []
        };

        if ( (topology != null) && (topology.Switches != null) ) {
            var legacyCount = 1;
            topology.Switches.forEach( function(sw:any, i) {
                return d3TopologyJSON.nodes.push({
                    "id": sw.id,
                    "type": "Switch",
                    "name": sw.name,
                    "status": sw.status,
                    "required": sw.required,
                    "_children": [],
                    "children": [],
                    "colorCode": sw.colorCode,
                    "fixed":sw.fixed,
                    "x":sw.x,
                    "y":sw.y
                });
            });
        }
                
        if (topology && (topology.Hosts != null)) {
            topology.Hosts.forEach( function(host:any, i) {                
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
                    "x":host.x,
                    "y":host.y
                });
            });
            let hostLink = {};
            topology.Hosts.forEach( (host:any, i)=> { 
                hostLink = {
                    linktype: "hostlink",
                    order: 1,
                    source: this.getNodeIndexByNodeAttr("id", host, "id", d3TopologyJSON.nodes),
                    target: this.getNodeIndexByNodeAttr("switchName", host, "name", d3TopologyJSON.nodes)
                };
                d3TopologyJSON.links.push(hostLink);
            });
            
        }

        
        if (topology && (topology.Links != null)) {
            topology.Links.forEach( (link:any, i)=> {

                return d3TopologyJSON.links.push({
                    "id": link.id,
                    "type": "Link",
                    "source": this.getNodeIndexByNodeAttr("srcName", link, "name", d3TopologyJSON.nodes),
                    "target": this.getNodeIndexByNodeAttr("destName", link, "name", d3TopologyJSON.nodes),
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
    }

 getNodeIndexByNodeAttr(nodeAttr, node, listAttr, nodeList){
     for(let i = 0; i < nodeList.length; i++){
        if(nodeList[i][listAttr] == node[nodeAttr]){
            return i;
        }
     }

 }

 static color(d) {

        // inside color
        if (d.type === "Host") {
            return "#c6dbef";
        }
        else if (d.type === "Internet") {
            return "#fd8d3c";
        }
        else if (d.type === "Switch") {
            if (d._children) {
                return "#7BB7EF";
            }
            if (d.children) {
                return "#7BB7EF";
            } else {
                return "#7BB7EF";
            }

        }
        return "#d6dbef";
    }

    static strokeWidth(d) {
        if (d.colorCode === "E") {
            return "7";
        } else {
            return "2";
        }
    }

    static strokeColor(d) {

        if (d.status === 0) {
            switch (d.colorCode) {
                case "A":
                    return "red";
                case "B":
                    if (d.type == "Switch" || d.type == "Host") {
                        return "blue";
                    } else {
                        if(d.source.version === '7' || d.target.version === '7'){
                            return 'blue';
                        }else{
                            return "#7bb7ef";
                        }

                    }
                case "C":
                    return "green";
                case "D":
                    return "purple";
                case "E":
                    return "aqua";
                default:
                    return "black";
            }
        } else if (d.status === 1) {
            return "green";
        } else if (d.status === 2) {
            return "red";
        } else if (d.status === 3) {
            return "#926E02";
        } else {
            return "black";
        }
    }

    static linkWidth(d) {
        if (d.source.type === "Switch" && d.target.type === "Switch") {
            switch (d.linkWeight) {
                case "A":
                    return "20";
                case "B":
                    if (d.source.version === '7' || d.target.version === '7') {
                        return '0.765';
                    } else {
                        return "9";
                    }
                case "C":
                    return "5";
                case "D":
                    return "2";
                case "E":
                    return "1";
                default:
                    return "3";
            }
        } else {
            return "3";
        }
    }

     static initShortestPathCalculations(host1, host2, graph){
        var sw1,sw2;

        graph.nodes.forEach((v,i)=>{
            //this cleans the green path from previous attempts otherwise if you disable a link and try again its other path may still remain
            if(v.colorCode == "C"){
                v.colorCode = "B";
            }

            v.explored = false;
            if(v.name == host1.switchName ){
                sw1=v;
            }else if(v.name == host2.switchName ){
                sw2=v;
            }

        });

        graph.links.forEach((v,i)=> {
            //RESETING FOR PREVIOUS SP ATTEMPTS
            if(v.colorCode == "C"){
                v.colorCode = "B";
            }
        });

        return this.shortestPathFunc(sw1,sw2,graph);
    }

    static shortestPathFunc(node1, node2, graph) {
        node1.explored = true;

        node1.cost = 0;
        var shortestPathArray = [];
        var cost = [];
        shortestPathArray.push(node1);

        while(shortestPathArray.length != 0){
            var workingNode = shortestPathArray.shift();

            var currentLinks = this.activeLinkFinder(workingNode,graph);

            //if no paths can be found due to root hopping then clear the blocked ones
            if(currentLinks.length == 0){
                graph.links.forEach( function(v,i){
                    if(v.blocked != 0){
                        v.blocked = 0;
                    }
                });
                currentLinks = this.activeLinkFinder(workingNode, graph);
            }

            //breadth first search
            currentLinks.forEach((v,i)=>{
                if (v.source.name != workingNode.name && v.source.explored != true) {
                    this.switchFinder(v.source.name, graph).cost = v.target.cost + 1;
                    this.switchFinder(v.source.name, graph).explored = true;
                    shortestPathArray.push(this.switchFinder(v.source.name, graph));
                    cost[v.source.name] = {
                        "parent": workingNode.name,
                        "cost": v.target.cost + 1
                    };
                } else if (v.target.name != workingNode.name && v.target.explored != true) {
                    this.switchFinder(v.target.name, graph).cost = v.source.cost + 1;
                    this.switchFinder(v.target.name, graph).explored = true;
                    shortestPathArray.push(this.switchFinder(v.target.name, graph));
                    cost[v.target.name] = {
                        "parent": workingNode.name,
                        "cost": v.source.cost + 1
                    };
                }
            });
        }

        var pathArray = this.thePathArray(node1, node2, cost);

        //you can delete this if
        if(pathArray == "Edge"){
            return "Edge";
        }
        return pathArray;


    }

    static thePathArray(begNode, endNode, costTable):any{
        var pathArray=[];
        var pointer = endNode.name;
        while(pointer != begNode.name){
            for(var key in costTable){

                //you can delete this if
                if( pointer != begNode.name && !( costTable.hasOwnProperty(pointer) ) ){
                    console.log("key doesnt exists, this is an unaccessible edge node");
                    return "Edge";

                }else if(key == pointer ){
                    pathArray.push(key);
                    pointer = costTable[key].parent;
                }
            }
        };

        return pathArray;
    }

    static activeLinkFinder(node, graph){
        var spLinkArray = [];

        graph.links.forEach( (v, i)=> {
            if(v.type == "Link"){
                if (v.source.name == node.name && v.source.blocked != 1 && v.blocked != 1) {
                    spLinkArray.push(v);
                } else if (v.target.name == node.name && v.target.blocked != 1 && v.blocked != 1) {
                    spLinkArray.push(v);
                }
            }
        });
        return spLinkArray;
    }

    static switchFinder(switchName, graph){
        for(var i = 0; i < graph.nodes.length; i++ ){
            if(switchName == graph.nodes[i].name){
                return graph.nodes[i];
            }
        }

    }

    static topologyFindSwitchDTOById(switchName, graph){
        for(var i = 0; i < graph.nodes.length; i++ ){
            if(switchName == graph.nodes[i].id){
                return graph.nodes[i];
            }
        }

    }

    static brokenLinkFinder(node, graph){
        var spLinkArray = [];
        graph.links.forEach( (v, i)=> {
            if(v.type == "Link"){
                if (v.source.name == node.name && v.source.blocked == 1) {
                    spLinkArray.push(v);
                } else if (v.target.name == node.name && v.target.blocked == 1) {
                    spLinkArray.push(v);
                }
            }
        });
        return spLinkArray;
    }
}

export var turkeyJSON:any =  {
                "Switches": [
                    {
                        "id": "s1",
                        "name": "İstanbul",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 189,
                        "y": 106
                    },
                    // {
                    //     "id": "s2",
                    //     "name": "İstanbul1",
                    //     "blocked": 0,
                    //     "status": 1,
                    //     "required": false,
                    //     "colorCode": "B",
                    //     "x": 195,
                    //     "y": 119
                    // },
                    // {
                    //     "id": "s3",
                    //     "name": "İstanbul2",
                    //     "blocked": 0,
                    //     "status": 1,
                    //     "required": false,
                    //     "colorCode": "B",
                    //     "x": 180,
                    //     "y": 100
                    // },
                    {
                        "id": "s4",
                        "name": "Konya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 378,
                        "y": 324
                    },
                    {
                        "id": "s5",
                        "name": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 650,
                        "y": 287
                    },
                    {
                        "id": "s6",
                        "name": "Erzurum",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 835,
                        "y": 195
                    },
                    {
                        "id": "s7",
                        "name": "İzmir",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 70,
                        "y": 288
                    },
                    {
                        "id": "s8",
                        "name": "Sinop",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 487,
                        "y": 81
                    },
                    {
                        "id": "s9",
                        "name": "İçel",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 433,
                        "y": 425
                    },
                    {
                        "id": "s10",
                        "name": "Antalya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 284,
                        "y": 397
                    },
                    {
                        "id": "s11",
                        "name": "Muğla",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 130,
                        "y": 380
                    },
                    {
                        "id": "s12",
                        "name": "Ankara",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 372,
                        "y": 194
                    },
                    {
                        "id": "s13",
                        "name": "Sivas",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 641,
                        "y": 199
                    },
                    {
                        "id": "s14",
                        "name": "Van",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 962,
                        "y": 277
                    },
                    {
                        "id": "s15",
                        "name": "Zonguldak",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 328,
                        "y": 98
                    },
                    {
                        "id": "s16",
                        "name": "Urfa",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 720,
                        "y": 385
                    }
                ],
                "Links": [
                    {
                        "id": "l1",
                        "srcName": "Ankara",
                        "destName": "İstanbul",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    // {
                    //     "id": "l2",
                    //     "srcName": "İstanbul1",
                    //     "destName": "İstanbul2",
                    //     "blocked": 0,
                    //     "status": 0,
                    //     "required": false,
                    //     "colorCode": "B",
                    //     "linkWeight": "B",
                    //     "type": "inside-switch-link"
                    // },
                    {
                        "id": "l3",
                        "srcName": "Ankara",
                        "destName": "Sinop",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },{
                        "id": "l4",
                        "srcName": "Ankara",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l5",
                        "srcName": "Sinop",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l6",
                        "srcName": "İstanbul",
                        "destName": "Zonguldak",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l7",
                        "srcName": "Sinop",
                        "destName": "Zonguldak",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l8",
                        "srcName": "Ankara",
                        "destName": "Zonguldak",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l9",
                        "srcName": "Erzurum",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B",
                        "customData": "2"
                    },
                    {
                        "id": "l10",
                        "srcName": "İzmir",
                        "destName": "İstanbul",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l11",
                        "srcName": "İzmir",
                        "destName": "Muğla",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l12",
                        "srcName": "Antalya",
                        "destName": "Muğla",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l3",
                        "srcName": "Antalya",
                        "destName": "İçel",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l14",
                        "srcName": "İzmir",
                        "destName": "Ankara",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l15",
                        "srcName": "Malatya",
                        "destName": "İçel",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l16",
                        "srcName": "Konya",
                        "destName": "İçel",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l17",
                        "srcName": "Konya",
                        "srcPortId": 2,
                        "destName": "Ankara",
                        "destPortId": 1,
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l18",
                        "srcName": "İçel",
                        "destName": "Urfa",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l19",
                        "srcName": "Van",
                        "destName": "Urfa",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l20",
                        "srcName": "Van",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l21",
                        "srcName": "Urfa",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l22",
                        "srcName": "Sivas",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l23",
                        "srcName": "Sivas",
                        "destName": "Sinop",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    },
                    {
                        "id": "l24",
                        "srcName": "Sivas",
                        "destName": "Erzurum",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "linkWeight": "B"
                    }
                ],
                "Hosts": [
                    {
                        "id": "h1",
                        "name": "192.168.0.101",
                        "switchName": "İstanbul",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 148,
                        "y": 102
                    },
                    {
                        "id": "h2",
                        "name": "192.168.0.101",
                        "switchName": "Malatya",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 700,
                        "y": 317
                    },
                    {
                        "id": "h3",
                        "name": "192.168.0.101",
                        "switchName": "Erzurum",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 860,
                        "y": 136
                    },
                    {
                        "id": "h4",
                        "name": "192.168.0.101",
                        "switchName": "Urfa",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 754,
                        "y": 399
                    },
                    {
                        "id": "h5",
                        "name": "192.168.0.103",
                        "switchName": "Van",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 944,
                        "y": 323
                    },
                    {
                        "id": "h6",
                        "name": "192.168.0.103",
                        "switchName": "Sivas",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 574,
                        "y": 231
                    },
                    {
                        "id": "h7",
                        "name": "192.168.0.101",
                        "switchName": "Konya",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 334,
                        "y": 362
                    },
                    {
                        "id": "h8",
                        "name": "192.168.0.101",
                        "switchName": "Antalya",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 215,
                        "y": 429
                    },
                    {
                        "id": "h9",
                        "name": "192.168.0.101",
                        "switchName": "Muğla",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 174,
                        "y": 406
                    },
                    {
                        "id": "h10",
                        "name": "192.168.0.101",
                        "switchName": "İzmir",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 116,
                        "y": 298
                    },
                    {
                        "id": "h11",
                        "name": "192.168.0.101",
                        "switchName": "Ankara",
                        "status": 0,
                        "required": false,
                        "colorCode": "B",
                        "x": 400,
                        "y": 250
                    }
                ]        
};

