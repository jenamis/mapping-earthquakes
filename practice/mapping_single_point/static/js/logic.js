// Add console.log to check if code is working
console.log("working");

// Create map object with center and zoom level
let map = L.map("mapid").setView([34.0522, -118.2437], 14);

// Add marker for Los Angeles, CA to map
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: "#ffffa1"
}).addTo(map);

// Create tile layer to be background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/dark-v10",
    accessToken: mapboxAPIKey
});

// Add 'graymap' tile layer to map
streets.addTo(map);