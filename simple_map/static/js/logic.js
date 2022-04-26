// Add console.log to check if code is working
console.log("working");

// Create map object with center and zoom level
let map = L.map("mapid").setView([40.7, -94.5], 4);

// Create tile layer to be background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: mapboxAPIKey
});
// Add 'graymap' tile layer to map
streets.addTo(map);