import { topoConfig } from './topology.service';

export var turkeyJSON:any =  {
                "Switches": [
                    {
                        "id": "s1",
                        "name": "İstanbul",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
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
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 378,
                        "y": 324
                    },
                    {
                        "id": "s5",
                        "name": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 650,
                        "y": 287
                    },
                    {
                        "id": "s6",
                        "name": "Erzurum",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 835,
                        "y": 195
                    },
                    {
                        "id": "s7",
                        "name": "İzmir",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 70,
                        "y": 288
                    },
                    {
                        "id": "s8",
                        "name": "Sinop",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 487,
                        "y": 81
                    },
                    {
                        "id": "s9",
                        "name": "İçel",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 433,
                        "y": 425
                    },
                    {
                        "id": "s10",
                        "name": "Antalya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 284,
                        "y": 397
                    },
                    {
                        "id": "s11",
                        "name": "Muğla",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 130,
                        "y": 380
                    },
                    {
                        "id": "s12",
                        "name": "Ankara",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 372,
                        "y": 194
                    },
                    {
                        "id": "s13",
                        "name": "Sivas",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 641,
                        "y": 199
                    },
                    {
                        "id": "s14",
                        "name": "Van",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 962,
                        "y": 277
                    },
                    {
                        "id": "s15",
                        "name": "Zonguldak",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
                        "x": 328,
                        "y": 98
                    },
                    {
                        "id": "s16",
                        "name": "Urfa",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultSwitchFillColor,
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
                        "colorCode": topoConfig.defaultLinkColor,
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
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },{
                        "id": "l4",
                        "srcName": "Ankara",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l5",
                        "srcName": "Sinop",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l6",
                        "srcName": "İstanbul",
                        "destName": "Zonguldak",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l7",
                        "srcName": "Sinop",
                        "destName": "Zonguldak",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l8",
                        "srcName": "Ankara",
                        "destName": "Zonguldak",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l9",
                        "srcName": "Erzurum",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
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
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l11",
                        "srcName": "İzmir",
                        "destName": "Muğla",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l12",
                        "srcName": "Antalya",
                        "destName": "Muğla",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l3",
                        "srcName": "Antalya",
                        "destName": "İçel",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l14",
                        "srcName": "İzmir",
                        "destName": "Ankara",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l15",
                        "srcName": "Malatya",
                        "destName": "İçel",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l16",
                        "srcName": "Konya",
                        "destName": "İçel",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
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
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l18",
                        "srcName": "İçel",
                        "destName": "Urfa",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l19",
                        "srcName": "Van",
                        "destName": "Urfa",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l20",
                        "srcName": "Van",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l21",
                        "srcName": "Urfa",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l22",
                        "srcName": "Sivas",
                        "destName": "Malatya",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l23",
                        "srcName": "Sivas",
                        "destName": "Sinop",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
                        "linkWeight": "B"
                    },
                    {
                        "id": "l24",
                        "srcName": "Sivas",
                        "destName": "Erzurum",
                        "blocked": 0,
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultLinkColor,
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
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 148,
                        "y": 102
                    },
                    {
                        "id": "h2",
                        "name": "192.168.0.101",
                        "switchName": "Malatya",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 700,
                        "y": 317
                    },
                    {
                        "id": "h3",
                        "name": "192.168.0.101",
                        "switchName": "Erzurum",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 860,
                        "y": 136
                    },
                    {
                        "id": "h4",
                        "name": "192.168.0.101",
                        "switchName": "Urfa",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 754,
                        "y": 399
                    },
                    {
                        "id": "h5",
                        "name": "192.168.0.103",
                        "switchName": "Van",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 944,
                        "y": 323
                    },
                    {
                        "id": "h6",
                        "name": "192.168.0.103",
                        "switchName": "Sivas",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 574,
                        "y": 231
                    },
                    {
                        "id": "h7",
                        "name": "192.168.0.101",
                        "switchName": "Konya",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 334,
                        "y": 362
                    },
                    {
                        "id": "h8",
                        "name": "192.168.0.101",
                        "switchName": "Antalya",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 215,
                        "y": 429
                    },
                    {
                        "id": "h9",
                        "name": "192.168.0.101",
                        "switchName": "Muğla",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 174,
                        "y": 406
                    },
                    {
                        "id": "h10",
                        "name": "192.168.0.101",
                        "switchName": "İzmir",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 116,
                        "y": 298
                    },
                    {
                        "id": "h11",
                        "name": "192.168.0.101",
                        "switchName": "Ankara",
                        "status": 0,
                        "required": false,
                        "colorCode": topoConfig.defaultHostFillColor,
                        "x": 400,
                        "y": 250
                    }
                ]        
};