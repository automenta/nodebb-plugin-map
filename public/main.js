$(document).ready(function() {
	
	var buttonid = 'MapPlugin_ToggleButton';
	var mapToggleButton = $('<li id="' + buttonid + '"><a><i class="fa fa-map-marker" title="Toggle Map"></i><span class="visible-xs-inline"> Toggle Map</span></a></li>');

	$('#main-nav').append( mapToggleButton );


	
	//$(window).on('action:ajaxify.end', function(e, data) {		
	{
		var showingMap = false;
		$('#' + buttonid).click(function() {
			if (showingMap) {
				disableMap();
			}
			else {
				enableMap();        
			}

		});

		var content, contentParent, map;

		function enableMap() {
			contentParent = $('#content').parent();
			showingMap = true;        

			if (!map)
				newMap(function(_map) {
					map = _map;
					content = $('#content').detach();
					contentParent.append(map);    
				});
			else {
				content = $('#content').detach();
				contentParent.append(map);
			}
		}

		function disableMap() {
			if (map)
				map.detach();
			
			contentParent.append(content);

			showingMap = false;
		}

		function newMap(cb) {
			require([
				'plugins/nodebb-plugin-map/public/vendor/leaflet/leaflet.js'
			], function(L) {
				
				var target = $('<div></div>');//.addClass('container-fluid');
				target.css('left', '0');
				target.css('top', '0');
				target.css('width', '100%');
				target.css('height', '100%');
				target.css('position', 'absolute');
				target.css('z-index', '-100');
				target.css('margin-top', '50px');
				target.css('margin-bottom', '-50px');
								
				setTimeout(function() {
					var initialLocation = {
						lat: 40, lon: -80
					};
					
					var map = L.map(target[0], {
						attributionControl: false
					}).setView(initialLocation, 12);

					var baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
						attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
					});
					baseLayer.addTo(map);
				}, 0);
				
				cb(target);				
			});
		}
		
	}

    
});

