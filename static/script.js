$( document ).ready(function() {
    console.log( "document loaded" );
});

$( window ).on( "load", function() {
    console.log( "window loaded" );
});


var map;
var moscow = {lat: 55.745, lng: 37.621};
var home = {lat: 55.639246, lng: 37.600816};
var infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: moscow,
        zoom: 9
    });

    addMarker(moscow, map, 'M', 'Moscow is the capital of Russia');
    addMarker(home, map, 'H', 'Home address: mkr.Chertanovo Severnoe');

    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);
    });

    map.addListener('click', function() {
        infowindow.close();
    });
    map.addListener('drag', function() {
        infowindow.close();
    });
}

function addMarker(location, map, name='', message='') {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: true,
        label: name
    });

    if (message != '') {
        marker.addListener('click', function() {
            if (infowindow) {
                infowindow.close();
            };
            infowindow = new google.maps.InfoWindow({
                content: message
            });
            infowindow.open(map, marker);
        });
    }
}

google.maps.event.addDomListener(window, 'load', initMap);