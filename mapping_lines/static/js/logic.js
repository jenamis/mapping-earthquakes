// Add console.log to check if code is working
console.log("working");

// Create map object with center and zoom level
let map = L.map("mapid").setView([41.2112, -95.9789], 5);

// Add coordinates for each point to be used in line
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
];

// Create polyline using line coordinates and make line yellow
L.polyline(line, {
    color: "yellow"
}).addTo(map);

// Add coordinates for each point to be used in line
let line2 = [
    [37.6213, -122.3790],
    [30.1975, -97.6664],
    [43.6777, -79.6248],
    [40.6413, -73.7781]
];

// Create polyline using line coordinates and make line blue dashed
L.polyline(line2, {
    color: "blue", 
    lineweight: 4,
    opacity: 0.5,
    dashArray: "6, 6"
}).addTo(map);

// Create tile layer to be background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapboxAPIKey
});

// Add 'graymap' tile layer to map
streets.addTo(map);