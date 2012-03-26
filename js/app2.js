var map;

var url = 'http://api.tiles.mapbox.com/v3/';
var baselayer = "occupy.wht-us-base"
var activelayer = "occupy.4q11-delinq";

wax.tilejson(url + baselayer + ',' + activelayer + ',occupy.state-lines' + '.jsonp', function(tilejson) {
  map = new L.Map('map')
  .addLayer(new wax.leaf.connector(tilejson))
  .setView(new L.LatLng(39, -78), 4);
  tilejson.minzoom = 2;
  tilejson.maxzoom = 7;
  wax.leaf.interaction()
    .map(map)
    .tilejson(tilejson)
    .on(wax.tooltip().animate(true).parent(map.parent).events());  
});

function refreshMap(layers) {
  wax.tilejson('http://api.tiles.mapbox.com/v3/' + layers + ',occupy.state-lines' + '.jsonp', function (tilejson) {
    map.addLayer(new wax.leaf.connector(tilejson));
    tilejson.minzoom = 2;
    tilejson.maxzoom = 7;
  wax.leaf.interaction()
    .map(map)
    .tilejson(tilejson)
    .on(wax.tooltip().animate(true).parent(map.parent).events());
  wax.tooltip()
	.animate(true)
	.parent()

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
