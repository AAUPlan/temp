import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import { Vector as VectorLayer } from "ol/layer.js";
import TileArcGISRest from "ol/source/TileArcGISRest";
import { bbox as bboxStrategy } from "ol/loadingstrategy.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { Stroke, Style } from "ol/style.js";
import TileWMS from 'ol/source/TileWMS.js';
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';

function createwmsLayer(urlString,dataName){
  var URL = urlString;
  var layer = dataName;
  //console.log(URL);
 // if (URL.includes("wms")) {
    //console.log (URL,layer);
    var tilesource = new TileWMS({
        url: URL,
        params: {'LAYERS': layer, 'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0        
    });
    
    return tilesource;
  //} 
}

function createLayer(urlString){
  var URL = urlString;
  
  let skibsvragSource = new VectorSource({
    format: new GeoJSON(),
    loader: function(extent) {
       var url = URL;
       var xhr = new XMLHttpRequest();
       xhr.open('GET', url);
       var onError = function() {
        skibsvragSource.removeLoadedExtent(extent);
       }
       xhr.onerror = onError;
       xhr.onload = function() {
         if (xhr.status == 200) {
            skibsvragSource.addFeatures(
                skibsvragSource.getFormat().readFeatures(xhr.responseText));
         } else {
           onError();
         }
       }
       xhr.send();
     },    
});
return skibsvragSource;
//console.log (skibsvragSource);
}

/*var tileLayer0 = new TileLayer({
  source: new TileWMS({
    url: 'https://94.231.110.64:8080/geoserver/AAU_Setup/wms',
    params: {'LAYERS': 'AAU_Setup:culturalheritage', 'TILED': false}        
  })
});*/

let backgroundmap = new TileLayer({
    id: "basemap",
    type: "base",
    title: "Basemap TOPO",
    source: new TileArcGISRest({
        url:
        "https://maps.helcom.fi/arcgis/rest/services/MADS/Basemap_TOPO/MapServer",
    }),
});

const map = new Map({
  //layers: [backgroundmap,tileLayer0],
  target: "map",

view: new View({
    //projection: 'EPSG:3035',
    maxZoom: 18,
    center: [1951895.95429, 8379944.28496],
    zoom: 6,
}),
});

function defineLayer (dataURL, dataID, dataName) {

    if (dataURL.includes("ows")) {
      //console.log("ows")
      return new VectorLayer({ //Now creating the layer on every function call, perhaps not good?
        source: createLayer(dataURL),
        title: dataID
      });  

    }

    if (dataURL.includes("wms")){
      //console.log("wfs")
      return new TileLayer({ 
        source: createwmsLayer(dataURL,dataName),
        title: dataID
      });
    }

      
    }

    exports.createMap = async function buildMap(curMap = map, background = backgroundmap){
      curMap.addLayer(background);
  }

exports.addLayerToMap = function(dataID, dataURL, dataName){
  let newLayerToggleSelector = document.querySelector(`#${dataID}`);
  
  const layer=defineLayer (dataURL, dataID, dataName);
  console.log (layer,dataURL);
  newLayerToggleSelector.addEventListener("change", e => {
    if(newLayerToggleSelector.checked) return map.addLayer(layer);
    if(!newLayerToggleSelector.checked) return map.removeLayer(layer);
  })
};



