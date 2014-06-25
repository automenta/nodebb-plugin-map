$(document).ready(function() {
	
	var buttonid = 'MapPlugin_ToggleButton';
	var mapToggleButton = $('<li id="' + buttonid + '"><a><i class="fa fa-map-marker" title="Toggle Map"></i><span class="visible-xs-inline"> Toggle Map</span></a></li>');

	$('#main-nav').append( mapToggleButton );


	function getJSONMeta(e) {
		var e = $(e);
		var content = e.find('.post-content');
		if (!content) return null;
		
		var jsonText = content.find('.lang-json').text();

		try {
			var j = JSON.parse(jsonText);
			return j;
		}
		catch (ex) { }
		
		return null;		
	}
	
	
	//add maps to posts
	$(window).on('action:topic.loaded', function() {
		$('.post-row').each(function(index, post) {
			post = $(post);
			var json = getJSONMeta(post);
			if (json) {
				if (json.where) {
					
					var t = $('<div></div>');
					t.css('width','100%').css('height', '300px');

					var options = {
						lat: json.where[0],
						lon: json.where[1]
					};
					
					newMap(t, options, function(map) {
						post.find('.post-content').after(map);
					});
					
				}
			}
			
		});
	});
	
	//add map chooser to composer
	$(window).on('action:composer.loaded', function(uuid) {
		/*
		<span class="btn btn-link" tabindex="-1">
		<i class="fa fa-list"></i>
		</span>
		*/
		var whereButton = $('<span class="btn btn-link" tabindex="-1"><i class="fa fa-map-marker"></i></span>');
		
		$('.composer .formatting-bar').append(whereButton);
		
	});
	
	
	
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

			if (!map) {
				var t = $('<div></div>');
				t.css('left', '0')
				.css('top', '0')
				.css('width', '100%')
				.css('height', '100%')
				.css('position', 'absolute')
				.css('z-index', '-100')
				.css('margin-top', '50px')
				.css('margin-bottom', '-50px');

				
				newMap(t, { }, function(_map) {
					map = _map;
					content = $('#content').detach();
					contentParent.append(map);    
				});
			}
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

		function newMap(target, options, cb) {
			require([
				'/plugins/nodebb-plugin-map/public/vendor/leaflet/leaflet.js'
			], function(L) {
				if (!target)
					target = $('<div></div>');
								
				if (!options) {
					options = {
						lat: 40,
						lon: 80
					};
				}
				
				setTimeout(function() {
					var initialLocation = {
						lat: options.lat, lon: options.lon
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

