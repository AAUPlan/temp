exports.cases = [
  {
    name: "German case",
    sites: [
      { name: "Schleswig-Holstein’s maritime cultural heritage", data: [] }
    ]
  },
  {
    name: "Danish-German case",
    sites: [{ name: "Flensburg Fjord", data: [{name: "hej", layer:"AAU_Setup:Danish_GermanCase", url: "http://94.231.110.64:8080/geoserver/AAU_Setup/wms", durl: "http://94.231.110.64:8080/geoserver/AAU_Setup/wms?service=WMS&version=1.1.0&request=GetMap&layers=AAU_Setup%3ADanish_GermanCase&bbox=2288046.3203999996%2C-232821.69289999828%2C2329076.3203999996%2C-205101.69289999828&width=768&height=518&srs=EPSG%3A3057&format=image%2Fgeotiff", dname: "Flensburg_Fjord_Case_Area"}] }]
  },
  {
    name: "Danish case",
    sites: [
      { name: "The Oeresund", data: [{name: "Shipwrecks", layer:"AAU_Setup:culturalheritage", url: "http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3Aculturalheritage&maxFeatures=50000&outputFormat=application%2Fjson&srsname=EPSG:3857", durl:"http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3Aculturalheritage&maxFeatures=50&outputFormat=SHAPE-ZIP", dname: "Shipwrecks"}, 
      {name: "Shipss", layer:"AAU_Setup:culturalheritage", url: "http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3Aculturalheritage&maxFeatures=50000&outputFormat=application%2Fjson&srsname=EPSG:3857", durl:"http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3Aculturalheritage&maxFeatures=50&outputFormat=SHAPE-ZIP", dname: "Shipwrecks"},
      {name: "Snewss", layer:"AAU_Setup:culturalheritage", url: "http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3Aculturalheritage&maxFeatures=50000&outputFormat=application%2Fjson&srsname=EPSG:3857", durl:"http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3Aculturalheritage&maxFeatures=50&outputFormat=SHAPE-ZIP", dname: "Shs"}] },
      { name: "The Bay of Koege", data: [] }
    ]
  },
  {
    name: "Polish case",
    sites: [
      { name: "Puck Lagoon ", data: [{name: "hej", url: "http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3AArchaelogicalSitesPoland&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:3857"}] },
      { name: "Gulf of Gdansk", data: [{name: "hej", url: "http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3AGulfGdansk&maxFeatures=50&outputFormat=application%2Fjson"}] }
    ]
  },
  { name: "Lithuanian case", sites: [{ name: "Relict forest", data: [{name: "hej", layer:"AAU_Setup:LithuanianShipWrecks", url:"http://94.231.110.64:8080/geoserver/AAU_Setup/wms?service=WMS&version=1.1.0&request=GetMap&layers=AAU_Setup%3ALithuanianShipWrecks&bbox=20.900150277777776%2C55.5000361%2C21.00027463888889%2C55.6263889&width=608&height=768&srs=EPSG%3A4326&format=application/openlayers", durl:"http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3ALithuanianShipWrecks&maxFeatures=50&outputFormat=SHAPE-ZIP", dname: "Polish_Shipwrecks"}] }] },
  {
    name: "Russian case",
    sites: [
      {
        name: "South-Eastern Baltic ",
        sites: [
          { name: "Pilot area 1", data: [{name: "hej", url: "http://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3AArchaelogicalSitesPoland&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:3857"}] },
          { name: "Pilot area 2", data: [] },
          { name: "Pilot area 3", data: [] }
        ]
      },
      {
        name: "Gulf of Finland",
        sites: [
          { name: "Pilot area 1", data: [] },
          { name: "Pilot area 2", data: [] }
        ]
      }
    ]
  },
  {
    name: "Finnish-Estonian case",
    sites: [{ name: "Gulf of Finland", data: [] }]
  },
  {
    name: "Finnish case",
    sites: [
      { name: "Gulf of Finland", data: [] },
      { name: "Gulf of Bothnia", data: [] }
    ]
  }
];

exports.panBalticCases = [
  {
    name: "Panbaltic Layers",
    data: [
      { name: "Rutilus Points", data: [] },
      { name: "Hansa Routes", data: [] },
      { name: "Underwater Landscape", data: [] }
    ]
  },
  {
    name: "National Data",
    sites: [
      { "name": "Germany", 
      "data": [
        {"name": "Wrecks-dots", "public":false, "layer":"", "url": "", "durl": "", "dname": ""},
        {"name": "Wrecks-density", "public":false, "layer":"", "url": "", "durl": "", "dname": ""}
      ] 
    },
  
    { "name": "Denmark", 
      "data": [
        {"name": "Wrecks-dots", "public":false, "layer":"AAU_Setup:vrag", "url": "http://94.231.110.64:8080/geoserver/AAU_Setup/wms", "durl": "", "dname": "wrecks_points_denmark"},
        {"name": "Wrecks-density", "public":true, "layer":"AAU_Setup:hexagosns_vrag", "url": "http://94.231.110.64:8080/geoserver/AAU_Setup/wms?service=WMS&version=1.1.0&request=GetMap&layers=AAU_Setup%3Ahexagosns_vrag&bbox=1049976.2171460772%2C7204902.859798463%2C1881234.758307235%2C7951547.51484547&width=768&height=689&srs=EPSG%3A3857&format=application/openlayers", "durl": "", "dname": "wrecks_polygons_denmark"}
      ] 
    },

    { "name": "Poland", 
      "data": [
        {"name": "Wrecks-dots", "public":false, "layer":"", "url": "", "durl": "", "dname": ""},
        {"name": "Wrecks-density", "public":false, "layer":"", "url": "", "durl": "", "dname": ""}
      ] 
    },

    { "name": "Lithuania", 
      "data": [
        {"name": "Wrecks-dots", "public":false, "layer":"", "url": "", "durl": "", "dname": ""},
        {"name": "Wrecks-density", "public":false, "layer":"", "url": "", "durl": "", "dname": ""}
      ] 
    },

    { "name": "Russia", 
      "data": [
        {"name": "Wrecks-dots", "public":false, "layer":"", "url": "", "durl": "", "dname": ""},
        {"name": "Wrecks-density", "public":false, "layer":"", "url": "", "durl": "", "dname": ""}
      ] 
    },

    { "name": "Finland", 
      "data": [
        {"name": "Wrecks-dots", "public":false, "layer":"", "url": "", "durl": "", "dname": ""},
        {"name": "Wrecks-density", "public":false, "layer":"", "url": "", "durl": "", "dname": ""}
      ] 
    }
    ]
  }
];

