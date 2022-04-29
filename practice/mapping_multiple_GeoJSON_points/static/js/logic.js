// Add console.log to check if code is working
console.log("working");

// Create street view tile layer to be default background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: mapboxAPIKey
});

// Create dark view tile layer to be option for map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/dark-v10",
        accessToken: mapboxAPIKey
    });

// Create base layer that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create map object with center, zoom level, and default layer
let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass map layers into layers control and add layers control to map
L.control.layers(baseMaps).addTo(map);

// Access airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/jenamis/mapping-earthquakes/main/majorAirports.json";

// Get GeoJSON data
d3.json(airportData).then(function(data) {
    console.log(data);
    // Create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h3> Airport code: " + feature.properties.faa + "</h3> <hr> <h3> Airport name: " + feature.properties.name + "</h3>");
        }
    }).addTo(map);
});

