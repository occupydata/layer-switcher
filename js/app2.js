var map, interactivity, layer;

var url = 'http://api.tiles.mapbox.com/v3/';
var baselayer = "occupy.wht-us-base";
var activelayer = "occupy.4q11-delinq";

wax.tilejson(url + baselayer + ',' + activelayer + ',occupy.state-lines' + '.jsonp', function(tilejson) {
  map = new L.Map('map')
    .setView(new L.LatLng(39, -78), 4);
  layer = new wax.leaf.connector(tilejson);
  map.addLayer(layer);
  interactivity = wax.leaf.interaction()
    .map(map)
    .tilejson(tilejson)
    .on(wax.tooltip().animate(true).parent(map._container).events());
  tilejson.minzoom = 2;
  tilejson.maxzoom = 7;
});

function refreshMap(layers) {
  wax.tilejson('http://api.tiles.mapbox.com/v3/' + layers + ',occupy.state-lines' + '.jsonp', function (tilejson) {
    tilejson.minzoom = 2;
    tilejson.maxzoom = 7;
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
        activeLayer
      ];
      refreshMap(layers);
    }
  });

});
