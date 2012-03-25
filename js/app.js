var map;

var url = 'http://api.tiles.mapbox.com/v3/';
var baselayer = "occupy.background"
var activelayer = "occupy.4q11-delinq";

// Define a custom icon using the Maki museum icon
var museumIcon = L.Icon.extend({
  iconUrl: 'img/museum-24.png',
  shadowUrl: null,
  iconSize: new L.Point(24, 24),
  shadowSize: null,
  iconAnchor: new L.Point(12, 24),
  popupAnchor: new L.Point(0,-24)
});

var geojsonLayer = new L.GeoJSON(data, {
  pointToLayer: function (latlng) {
    return new L.Marker(latlng, {
      icon: new museumIcon()
    });
  }
});

wax.tilejson(url + baselayer + ',' + activelayer + '.jsonp', function(tilejson) {
  map = new L.Map('map')
  .setView(new L.LatLng(39, -78), 4)
  .addLayer(new wax.leaf.connector(tilejson))
  .addLayer(geojsonLayer);

  tilejson.minzoom = 2;
  tilejson.maxzoom = 7;

  geojsonLayer.on('featureparse', function (e) {
    if (e.properties && e.properties.name){
      e.layer.bindPopup(e.properties.name);
    }
  });

  geojsonLayer.addGeoJSON(data);
});

function refreshMap(layers) {
  wax.tilejson('http://api.tiles.mapbox.com/v3/' + layers + '.jsonp', function (tilejson) {
    map.addLayer(new wax.leaf.connector(tilejson));

    tilejson.minzoom = 2;
    tilejson.maxzoom = 7;
  });
}

$(document).ready(function () {

  $('sidebar ul.layers li a').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {
      $('ul.layers li a').removeClass('active');
      $(this).addClass('active');
      var activeLayer = $(this).attr('data-layer');
      layers = [
        baselayer,
        activeLayer
      ];
      refreshMap(layers);
    }
  });

});
