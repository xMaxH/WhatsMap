let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    // Add markers or other functionalities here
}

function clearMarkers() {
    for (let marker of markers) {
        marker.setMap(null);
    }
    markers = [];
}

// Dummy function to simulate adding markers based on category
function addCategoryMarkers(category) {
    clearMarkers();
    // Replace this with a backend call to fetch location data for the given category and add markers to the map.
    const marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        title: category
    });
    markers.push(marker);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            addCategoryMarkers(this.getAttribute('data-category'));
        });
    });
});
