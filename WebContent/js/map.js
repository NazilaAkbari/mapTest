var data = {

};

var app = {
	tehranPosition : new OpenLayers.LonLat(51.3904283, 35.6995636).transform(
			'EPSG:4326', 'EPSG:900913'),
	init : function() {
		this.map = new OpenLayers.Map({
			div : "postMap", // map container div in post.html
			layers : [ new OpenLayers.Layer.OSM() ],
			projection : "EPSG:3857",
			theme : "libs/openlayers/theme/default/style.css"
		});
		// add markers layer into map
		this.markers = new OpenLayers.Layer.Markers("Markers");
		this.map.addLayer(this.markers);

		this.map.setCenter(this.tehranPosition, 11);

		var map = this.map;
		var self = this;
		this.map.events.register("click", map, function(e) {
			var position = self.map.getLonLatFromPixel(e.xy);
			self.markers.removeMarker(self.marker);
			self.marker = new OpenLayers.Marker(position);
			self.markers.addMarker(self.marker);
			data.location = position.clone();
			data.location.transform('EPSG:900913', 'EPSG:4326');
		});
	}
};

$(document).ready(function() {
	app.init();
});