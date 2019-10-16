import Map from "ol/Map.js";
import View from "ol/View.js";
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import { Vector as VectorLayer } from "ol/layer.js";
import TileArcGISRest from "ol/source/TileArcGISRest";
import { bbox as bboxStrategy } from "ol/loadingstrategy.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { Stroke, Style } from "ol/style.js";
import TileWMS from 'ol/source/TileWMS.js';
import { toPng } from 'html-to-image';


  function createwmsLayer(urlString,dataName){
    var URL = urlString;
    var layer = dataName;

    var tilesource = new TileWMS({
      url: URL,
      params: {'LAYERS': layer, 'TILED': true},
      serverType: 'geoserver',
      transition: 0
    });

    return tilesource;
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

var scaleLineControl = new ScaleLine();

var view = new View({
    maxZoom: 18, //18
    center: [1951895.95429, 8379944.28496],
    zoom: 5, //6
});

const map = new Map({
  //layers: [backgroundmap,tileLayer0],
  target: "map",
  controls: defaultControls().extend([
    scaleLineControl
  ]),
  view: view,
});

/*map.on('singleclick', function (evt) {
    document.getElementById('info').innerHTML = 'hello';
    var viewResolution =  @type {number}  (view.getResolution());
    var url = createwmsLayer(dataURL, dataName).getFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        { 'INFO_FORMAT': 'text/html' });
    if (url) {
        fetch(url)
            .then(function (response) { return response.text(); })
            .then(function (html) {
                document.getElementById('info').innerHTML = html;
            });
    }
});
*/

function defineLayer (dataURL, dataID, dataName) {

    if (dataURL.includes("ows")) {
      return new VectorLayer({ //Now creating the layer on every function call, perhaps not good?
        source: createLayer(dataURL),
        title: dataID
      });

    }

    if (dataURL.includes("wms")){
      return new TileLayer({
        source: createwmsLayer(dataURL,dataName),
        title: dataID
      });
    }
}

/*// export options for html-to-image.
// See: https://github.com/bubkoo/html-to-image#options
var exportOptions = {
    filter: function (element) {
        return element.className ? element.className.indexOf('ol-control') === -1 : true;
    }
};

document.getElementById('export-png').addEventListener('click', function () {
    map.once('rendercomplete', function () {
        toPng(map.getTargetElement(), exportOptions)
            .then(function (dataURL) {
                var link = document.getElementById('image-download');
                link.href = dataURL;
                link.setAttribute ('crossOrigin','anonymous')
                link.crossorigin = "anonymous"
                link.click();
            });
    });
    map.renderSync();
});
*/
exports.addLayerToMap = function(dataID, dataURL, dataName){
  let newLayerToggleSelector = document.querySelector(`#${dataID}`);
  const layer=defineLayer (dataURL, dataID, dataName);

  newLayerToggleSelector.addEventListener("change", e => {
    if(newLayerToggleSelector.checked) return map.addLayer(layer);
    if(!newLayerToggleSelector.checked) return map.removeLayer(layer);
  })
};

exports.createMap = async function buildMap(curMap = map, background = backgroundmap){
  curMap.addLayer(background);
}
