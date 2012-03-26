var map, interactivity, layer;

var url = 'http://api.tiles.mapbox.com/v3/';
var baselayer = "mapbox.mapbox-streets";
var activelayer = "occupy.4q11-delinq";
var statelayer = "occupy.state-lines";

// Define a custom icon using the Maki museum icon
var museumIcon = L.Icon.extend({
  iconUrl: 'img/museum-24.png',
  shadowUrl: null,
  iconSize: new L.Point(24, 24),
  shadowSize: null,
  iconAnchor: new L.Point(12, 24),
  popupAnchor: new L.Point(0,-24)
});

// Define a geojson data layer
  var geojsonLayer = new L.GeoJSON(data, {
  pointToLayer: function (latlng) {
    return new L.Marker(latlng, {
      icon: new museumIcon()
    });
  }
});

wax.tilejson(url + baselayer + ',' + activelayer + ',' + statelayer + '.jsonp', function(tilejson) {
  map = new L.Map('map')
    .setView(new L.LatLng(39, -78), 4);

  layer = new wax.leaf.connector(tilejson);
  map.addLayer(layer);
  map.addLayer(geojsonLayer);

  tilejson.minzoom = 2;
  tilejson.maxzoom = 7;

  interactivity = wax.leaf.interaction()
    .map(map)
    .tilejson(tilejson)
    .on(wax.tooltip().animate(true).parent(map._container).events());

  geojsonLayer.on('featureparse', function (e) {
    if (e.properties && e.properties.name){
      e.layer.bindPopup(e.properties.name);
    }
  });

  geojsonLayer.addGeoJSON(data);
});

function refreshMap(layers) {
  wax.tilejson(url + layers + '.jsonp', function(tilejson) {
    map.addLayer(new wax.leaf.connector(tilejson));

    // This little dance to try to avoid a flash,
    // but Leaflet seems to flash anyway
    var newlayer = new wax.leaf.connector(tilejson);
    map.addLayer(newlayer);
    map.removeLayer(layer);
    layer = newlayer;
    interactivity.tilejson(tilejson);
  });
}

$(document).ready(function () {

  $('ul.layers li a').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {
    $('ul.layers li a').removeClass('active');
      $(this).addClass('active');
      var activeLayer = $(this).attr('data-layer');
      layers = [
        baselayer,
        activeLayer,
        statelayer
      ];
      refreshMap(layers);
    }
  });

});
