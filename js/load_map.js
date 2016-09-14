var geocoder;
var map;


      // Create a new blank array for all the listing markers.
      var markers = [];
	  
      // This global polygon variable is to ensure only ONE polygon is rendered.
      var polygon = null;

		// create placesmarkers array to use in multiple functions to have control
		//over the number of places that show
		var placeMarkers = [];
		//marker to show filter
		var gmarkers1 = [];
	

      function initMap() {

	
        // Create a styles array to use with the map.
        var styles = [
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          }
        ];

		var userLatlng ={lat: 47.6557113, lng: -122.6510836};

        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {

          center: userLatlng,
          zoom: 8,
          styles: styles,		 
          mapTypeControl: true		  
        });

			
		//This autocomplete is for use in the geocoder entry box.
		var zoomAutoComplete = new google.maps.places.Autocomplete(
		document.getElementById('zoom-to-area-text'));
		
        //*** These are the trail listings that will be shown to the user.
        // Normally we'd have these in a database instead.
        var locations = [
			
          {title: 'Rattlesnake Ledge Trail', location: {lat: 47.4714354, lng: -121.8177473}, desc:'MODERATE, 8.9 miles, 2582 feet, Out & Back'},		  
		  {title: 'Little Si Trail', location: {lat: 47.4908992, lng: -121.7625311}, desc:'MODERATE, 3.8 miles, 1131 feet, Out & Back'},
		  {title: 'Sunrise Rim Trail', location: {lat: 46.9131828, lng: -121.6468068}, desc:'Easy, 5.5 miles, 1115 feet, Loop Trail'},
		  {title: 'Syncline Trail', location: {lat: 45.7032444, lng: -121.4116142}, desc:'MODERATE, 7.8 miles,  1266 feet, Round Trip'},
		  {title: 'Sol Duc Trailhead', location: {lat: 47.9532554, lng: -123.8285558}, desc:'MODERATE,7.2 miles, 2000ft. to 4800ft., round trip'},
		  {title: 'Trail of the Shadows', location: {lat: 46.7515098, lng: -121.8170653}, desc:'EASY, 0.7 miles, 36 feet, Loop'},
		  {title: 'Rampart Ridge Trail', location: {lat: 46.7595241, lng: -121.8209944}, desc:'MODERATE, 4.9 miles, 1374 feet, Loop'},	
		  {title: 'Nisqually Vista Trail', location: {lat: 46.7865858, lng: -121.7469786}, desc:'EASY, 1.0 miles, 160 feet, Loop'},		  
		  {title: 'Silver Falls Trail', location: {lat: 46.7368754, lng: -121.5667647}, desc:'EASY, 2.8 miles, 547 feet, Loop'},          
          {title: 'Naches Peak Loop Trail', location: {lat: 46.866974, lng: -121.5200926}, desc:'EASY, 3.4 miles, 652 feet, Loop'},
		  {title: 'Glacier Basin Trail', location: {lat: 46.900227, lng: -121.6643814}, desc:'MODERATE, 8.4 miles, 2834 feet, Out & Back'},
		  {title: 'Burroughs Mountain Trail', location: {lat: 46.9139234, lng: -121.6439956}, desc:'MODERATE, 9.0 miles, 2339 feet, Out & Back'},		  
          {title: 'Bench and Snow Lake Trail', location: {lat: 46.7638672, lng: -121.6998456}, desc:'EASY, 2.3 miles, 446 feet, Out & Back'},
          {title: 'Annette Lake', location: {lat: 47.3853445, lng: -121.4791483}, desc:'MODERATE, 6.5 miles, 1899 feet, Out & Back'},		  
		   {title: 'Mount Washington Trail', location: {lat: 47.4363138, lng: -121.6925901}, desc:'MODERATE, 7.9 miles, 3067 feet, Out & Back'},
          {title: 'Sammamish River Trail', location: {lat: 47.6773968, lng: -122.1341687}, desc:'EASY, 3.1 miles, 19 feet, Out & Back'},
		  {title: 'Lake Twenty-Two Trail', location: {lat: 48.0704414, lng: -121.7636214}, desc:'MODERATE, 6.7 miles, 1548 feet, Loop'},
          {title: 'South Tiger Mountain Trail', location: {lat: 47.4683641, lng: -121.9385556}, desc:'EASY, 4.0 miles, 767 feet, Out & Back'},
          {title: 'Talus Rocks Loop', location: {lat: 47.5192669, lng: -121.9973853}, desc:'EASY, 2.5 miles, 675 feet, Loop'},
          {title: 'Preston Trail', location: {lat: 47.5130569, lng: -121.9569382}, desc:'MODERATE, 8.4 miles, 2788 feet, Out & Back'},
		   {title: 'Stans Overlook', location: {lat: 47.4930232, lng: -121.8360735}, desc:'MODERATE, 4.2 miles, 1099 feet, Out & Back'},
		  {title: 'Chirico Trail to Poo-Poo Point', location: {lat: 47.4981936, lng: -122.0186825}, desc:'MODERATE, 3.6 miles, 1617 feet, Out & Back'},
          {title: 'Beckler Peak', location: {lat: 47.7244721, lng: -121.2688259}, desc:'MODERATE, 7.5 miles, 2214 feet, Out & Back'},
          {title: 'Heather Lake Trail', location: {lat: 48.0830928, lng: -121.7760712}, desc:'EASY, 4.3 miles, 1197 feet, Out & Back'},		            
          {title: 'Colonel Bob Trail ', location: {lat: 47.4973936, lng: -123.7953987}, desc:'HARD, 13.6 miles, 5872 feet, Out & Back'},
		  {title: 'Wynoochee Lake Shore Trail', location: {lat: 47.403482, lng: -123.1245659}, desc:'MODERATE, 12.0 miles, 30 feet'},		  
          {title: 'Dry Copper Creek Trail', location: {lat: 47.5035752, lng: -123.3249831}, desc:'MODERATE, 5.0 miles, 2400 feet, roundtrip'},
          {title: 'Church Creek - Satsop Lakes Trail', location: {lat: 47.4258011, lng: -123.520159}, desc:'MODERATE, 4.9 miles, 2454 feet, Out & Back'},         
          {title: 'Upper Lena Lake Trail', location: {lat: 47.63455, lng: -123.2093337}, desc:'HARD, 14.0 miles, 3900 feet, roundtrip'},
		  {title: 'Hoh Lake Trail', location: {lat: 47.8643042, lng: -123.9313735}, desc:'HARD, 28.8 miles, 4543 feet, Out & Back'},
          {title: 'Hurricane Hill Trail', location: {lat: 47.984805, lng: -123.5292172}, desc:'EASY, 3.2 miles, 741 feet, Out & Back'},
		  {title: 'Mount Walker Trail', location: {lat: 47.7784688, lng: -122.9161044}, desc:'MODERATE, 10.0 miles, 1617 feet, Loop'},
          {title: 'Fragrance Lake Trail', location: {lat: 48.6534236, lng: -122.4921905}, desc:'EASY, 4.2 miles, 511 feet, Loop'},
		  {title: 'Lake Serene & Bridal Veil Falls Trailhead', location: {lat: 47.8090221, lng: -121.5761556}, desc:'MODERATE, 8.2 miles, 2000 feet, roundtrip'},		  
		  {title: 'Bench & Snow Lakes Trail', location: {lat: 46.7866428, lng: -121.7798093}, desc:'EASY, 2.3 miles, 446 feet, Out & Back'}
        ];
		geocoder = new google.maps.Geocoder();				  

        var largeInfowindow = new google.maps.InfoWindow();					
	


		
        // Initialize the drawing manager.
        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
            ]
          }
        });
        // Style the markers a bit. This will be our listing marker icon.
        var defaultIcon = makeMarkerIcon('008000');
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = makeMarkerIcon('FFFF24');
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
		  var coordinates = new google.maps.LatLng(locations[i].location);  

          var title = locations[i].title;
		  var desc = locations[i].desc;
		  var category = locations[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
			desc: desc,	
			coordinates:coordinates,	

			 category: category,
            id: i
          });













		   gmarkers1.push(marker);

		 
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open the large infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
	
          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
		  
 
		  
        }
		//create a searchbox in order to execute a places search		
		var searchBox = new google.maps.places.SearchBox( document.getElementById('places-search') );
		//Bias the searchbox to within the bounds of the map
		searchBox.setBounds(map.getBounds());
		
		
        document.getElementById('show-trails').addEventListener('click', showListings);
        document.getElementById('hide-trails').addEventListener('click', hideListings);
        document.getElementById('toggle-drawing').addEventListener('click', function() {
          toggleDrawing(drawingManager);
        });
        document.getElementById('zoom-to-area').addEventListener('click', function() {
          zoomToArea();

        });
		  
		//listen for the event fired when the user selects a prediction from the picklist
		//and retrive more details for that places
		searchBox.addListener('places_changed', function(){
			searchBoxPlaces(this);
		});
		//listen for the event fired when the user selects a prediction and clicks
		//"go" more details for that place
		document.getElementById('go-places').addEventListener('click', textSearchPlaces);
		  
        // Add an event listener so that the polygon is captured,  call the
        // searchWithinPolygon function. This will show the markers in the polygon,
        // and hide any outside of it.
        drawingManager.addListener('overlaycomplete', function(event) {
          // First, check if there is an existing polygon.
          // If there is, get rid of it and remove the markers
		  
          if (polygon) {
            polygon.setMap(null);

            hideListings(markers);
          }
          // Switching the drawing mode to the HAND (i.e., no longer drawing).
          drawingManager.setDrawingMode(null);
          // Creating a new editable polygon from the overlay.
          polygon = event.overlay;
          polygon.setEditable(true);
          // Searching within the polygon.
          searchWithinPolygon();
          // Make sure the search is re-done if the poly is changed.
          polygon.getPath().addListener('set_at', searchWithinPolygon);
          polygon.getPath().addListener('insert_at', searchWithinPolygon);
		  //calculating area within the polygon after completion of polygon draw event
		  /*var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
		  window.alert(area + "SQUARE METERS");*/
        });	

		 
			 /**
		 * Function to filter markers by category
		 */

		filterMarkers = function (category) {
			for (i = 0; i < locations.length; i++) {
				marker_show = gmarkers1[i];
				// If is same category or category not picked
				if (marker_show.category == category || category.length === 0) {
					marker_show.setVisible(true);
				}
				// Categories don't match 
				else {
					marker_show.setVisible(false);
				}
			}
		}


		
    } //Mapinit()
	



      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
		  	
	 	  
		var newAddr="";
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent('');
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
		  
				
		  
		  // geocode gets an address from google by making function call
		var latlng = {lat: marker.coordinates.lat(), lng: marker.coordinates.lng()};
	   geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              map.setZoom(8);
			  newAddr = results[1].formatted_address;             
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });

          var streetViewService = new google.maps.StreetViewService();
          var radius = 1000;
		  		
	
// In case the status is OK, which means the pano was found, compute the
// position of the streetview image, then calculate the heading, then get a
// panorama from that and set the options
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK ) {
                var nearStreetViewLocation = data.location.latLng;			  			  			  
                var heading = google.maps.geometry.spherical.computeHeading( nearStreetViewLocation, marker.position);			  
                infowindow.setContent('<div>' + marker.title + '</div><div id="latlng">'+ marker.coordinates +'</div><div id="address">'+ newAddr+ '</div><div id="decs">'+ marker.desc +'</div><div id="pano"></div>');
				
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,			
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' + '<div id="latlng">'+ marker.coordinates+'</div><div id="address">'+ newAddr+'</div>' +'<div id="decs">'+ marker.desc +'</div>' + '<div>No Street View Found</div>');
            }
          }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
        }
      }
      // This function will loop through the markers array and display them all.
      function showListings() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
			
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
		  
		 
		  
        }
        map.fitBounds(bounds);
      }
	  function hideListings() {

        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }
      // This function will loop through the listings and hide them all.
      function hideMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }
      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
      // This shows and hides (respectively) the drawing options.
      function toggleDrawing(drawingManager) {
        if (drawingManager.map) {
          drawingManager.setMap(null);
          // In case the user drew anything, get rid of the polygon
          if (polygon !== null) {
            polygon.setMap(null);
          }
        } else {
          drawingManager.setMap(map);
        }
      }
      // This function hides all markers outside the polygon,
      // and shows only the ones within it. This is so that the
      // user can specify an exact area of search.
      function searchWithinPolygon() {
        for (var i = 0; i < markers.length; i++) {
          if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {			 
            markers[i].setMap(map);
          } else {
            markers[i].setMap(null);
          }
        }
      }

      // This function takes the input value in the find nearby area text input
      // locates it, and then zooms into that area. This is so that the user can
      // show all listings, then decide to focus on one area of the map.
      function zoomToArea() {
        // Initialize the geocoder.
        var geocoder = new google.maps.Geocoder();
        // Get the address or place that the user entered.
        var address = document.getElementById('zoom-to-area-text').value;
        // Make sure the address isn't blank.
        if (address == '') {
          window.alert('You must enter an area, or address.');
        } else {
          // Geocode the address/area entered to get the center. Then, center the map
          // on it and zoom in
          geocoder.geocode(
            { address: address,
              componentRestrictions:{administrativeArea: 'WA' }
            }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(10);
              } else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
              }
            });
        }
	  }
	
     //this function invokes when the user selects a searchbox picklist item.
	 //it will do a nearby search using the selected query string or place
	 function searchBoxPlaces(searchBox){
		 hideMarkers(placeMarkers);
		 var places = searchBox.getPlaces();
		 //for each place, get the icon , name and location
		 createMarkerForPlaces(places);
		 if(places.length == 0){
			 window.alert('We did not find any places matching that search!');
		 }
	 }
	 //this function invokes when the user selects "go" on th places  search
	 //it will do a nearby search using the selected query string or place
	 function textSearchPlaces(){
		 var bounds = map.getBounds();
		 hideMarkers(placeMarkers);
		 var placesService = new google.maps.places.PlacesService(map);
		 placesService.textSearch({
			 query: document.getElementById('places-search').value,
			 bounds: bounds
			 }, function(results, status){
				if(status == google.maps.places.PlacesServiceStatus.OK){
					createMarkerForPlaces(results);
				} 
			 });
	 }
	 //this function creates markers for each place found in either places search
	 function createMarkerForPlaces(places){
		 var bounds = new google.maps.LatLngBounds();
		 for(var i = 0; i < places.length; i++){
			 var place = places[i];
			 var icon = {
				 url:place.icon,
				 size: new google.maps.Size(35,35),
				 origin: new google.maps.Point(0,0),
				 anchor: new google.maps.Point(15,34),
				 scaledSize: new google.maps.Size(25,25)
			 };
			 //create a marker for each place
			 var marker = new google.maps.Marker({
				 map: map,
				 icon: icon,
				 title: place.name,
				 position:place.geometry.location,
				 id: place.id
				 });
				 
				 placeMarkers.push(marker);
				 if(place.geometry.viewport){
					 //only geocode have viewport
					 bounds.union(place.geometry.viewport);
				 }else{
					 bounds.extend(place.geometry.location);
				 }				 
		 }
		 map.fitBounds(bounds);
	 }
	 
	

