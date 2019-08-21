exports.cases = [
  {
    name: "German case",
    sites: [
      { name: "Schleswig-Holstein’s maritime cultural heritage", data: [{name: "hej"}] }
    ]
  },
  {
    name: "Danish-German case",
    sites: [{ name: "Flensburg Fjord", data: [{name: "hej", layer:"AAU_Setup:Danish_GermanCase", url: "https://94.231.110.64:8080/geoserver/AAU_Setup/wms"}] }]
  },
  {
    name: "Danish case",
    sites: [
      { name: "The Oeresund", data: [{name: "hej", layer:"AAU_Setup:culturalheritage1", url: "https://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3Aculturalheritage&maxFeatures=50000&outputFormat=application%2Fjson&srsname=EPSG:3857"}] },
      { name: "The Bay of Koege", data: [{name: "hej"}] }
    ]
  },
  {
    name: "Polish case",
    sites: [
      { name: "Puck Lagoon ", data: [{name: "hej", url: "https://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3AArchaelogicalSitesPoland&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:3857"}] },
      { name: "Gulf of Gdansk", data: [{name: "hej", url: "https://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3AGulfGdansk&maxFeatures=50&outputFormat=application%2Fjson"}] }
    ]
  },
  { name: "Lithuanian case", sites: [{ name: "Relict forest", data: [{name: "hej", layer:"AAU_Setup:LithuanianShipWrecks", url:"https://94.231.110.64:8080/geoserver/AAU_Setup/wms/kml?layers=AAU_Setup:LithuanianShipWrecks"}] }] },
  {
    name: "Russian case",
    sites: [
      {
        name: "South-Eastern Baltic ",
        sites: [
          { name: "Pilot area 1", data: [{name: "hej"}] },
          { name: "Pilot area 2", data: [{name: "hej"}] },
          { name: "Pilot area 3", data: [{name: "hej"}] }
        ]
      },
      {
        name: "Gulf of Finland",
        sites: [
          { name: "Pilot area 1", data: [{name: "hej"}] },
          { name: "Pilot area 2", data: [{name: "hej"}] }
        ]
      }
    ]
  },
  {
    name: "Finnish-Estonian case",
    sites: [{ name: "Gulf of Finland", data: [{name: "hej"}] }]
  },
  {
    name: "Finnish case",
    sites: [
      { name: "Gulf of Finland", data: [{name: "hej"}] },
      { name: "Gulf of Bothnia", data: [{name: "hej"}] }
    ]
  }
];

exports.panBalticCases = [
  {
    name: "German2 case",
    sites: [{ name: "Schleswig-Holstein’s maritime cultural heritage" }]
  },
  { name: "Danish-German case2", sites: [{ name: "Flensburg Fjord" }] },
  {
    name: "Danish case2",
    sites: [{ name: "The Oeresund" }, { name: "The Bay of Koege" }]
  },
  {
    name: "Polish case2",
    sites: [{ name: "Puck Lagoon " }, { name: "Gulf of Gdansk" }]
  },
  { name: "Lithuanian case2", sites: [{ name: "Relict forest" }] },
  {
    name: "Russian case2",
    sites: [
      {
        name: "South-Eastern Baltic2 ",
        sites: [
          { name: "Pilot area 1" },
          { name: "Pilot area 2" },
          { name: "Pilot area 3" }
        ]
      },
      {
        name: "Gulf of Finland2",
        sites: [{ name: "Pilot area 1" }, { name: "Pilot area 2" }]
      }
    ]
  },
  { name: "Finnish-Estonian case2", sites: [{ name: "Gulf of Finland" }] },
  {
    name: "Finnish case",
    sites: [{ name: "Gulf of Finland" }, { name: "Gulf of Bothnia" }]
  }
];
