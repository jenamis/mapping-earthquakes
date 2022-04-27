// Add console.log to check if code is working
console.log("working");

// Create map object with center at San Francisco airport
let map = L.map("mapid").setView([37.5, -122.5], 10);

// Add GeoJSON data
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// // Add GeoJSON data to map
// L.geoJSON(sanFranAirport, {
//     // Turn each feature into marker on map -- using pointToLayer
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//     }
// }).addTo(map);

// Add GeoJSON data to map
L.geoJSON(sanFranAirport, {
    // Turn each feature into marker on map -- using onEachFeature
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h3> Airport code: " + feature.properties.faa + "</h3> <hr> <h3> Airport name: " + feature.properties.name + "</h3>");
    }
}).addTo(map);

// Create tile layer to be background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: "mapbox/navigation-night-v1",
    id: "mapbox/outdoors-v11",
    accessToken: mapboxAPIKey
});

// Add 'graymap' tile layer to map
streets.addTo(map);