var map;

var url = 'http://api.tiles.mapbox.com/v2/';
var baselayer = "occupy.background"
var activelayer = "occupy.4q11-delinq";

wax.tilejson(url + baselayer + ',' + activelayer + '.jsonp', function(tilejson) {
  map = new L.Map('map')
  .setView(new L.LatLng(39, -78), 4)
  .addLayer(new wax.leaf.connector(tilejson));

  tilejson.minzoom = 2;
  tilejson.maxzoom = 7;

});

function refreshMap(layers) {
  wax.tilejson('http://api.tiles.mapbox.com/v2/' + layers + '.jsonp', function (tilejson) {
    map.addLayer(new wax.leaf.connector(tilejson));

    tilejson.minzoom = 2;
    tilejson.maxzoom = 7;
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
