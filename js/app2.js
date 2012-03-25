var map;

var url = 'http://api.tiles.mapbox.com/v2/';
var baselayer = "occupy.wht-us-base"
var activelayer = "occupy.4q11-delinq";

wax.tilejson(url + baselayer + ',' + activelayer + ',occupy.state-lines' + '.jsonp', function(tilejson) {
  map = new L.Map('map')
  .setView(new L.LatLng(39, -78), 4)
  .addLayer(new wax.leaf.connector(tilejson));
  wax.mm.interaction()
    .map(map)
    .tilejson(tilejson)
    .on(wax.tooltip().animate(true).parent(map.parent).events());

  tilejson.minzoom = 2;
  tilejson.maxzoom = 7;
  
});

function refreshMap(layers) {
  wax.tilejson('http://api.tiles.mapbox.com/v2/' + layers + ',occupy.state-lines' + '.jsonp', function (tilejson) {
    map.addLayer(new wax.leaf.connector(tilejson));

    tilejson.minzoom = 2;
    tilejson.maxzoom = 7;
  });
}

$(document).ready(function () {

  // create a new UI Slider. Requires jQuery version 1.8
  // http://docs.jquery.com/UI/API/1.8/Slider
  $("#slider").slider({min:1999, max: 2011});

  // refresh the map every time the slider changes
  $("#slider").bind( "slidechange", function(event, ui) {
  	// occupy.4q11-delinq
  	var value = $("#slider").slider("value") + "";
  	var year = value.substring(2,4);
  	var activeLayer = "occupy.4q" + year + "-delinq";
  	var layers = [baselayer, activeLayer];
  	refreshMap(layers);
  });

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
