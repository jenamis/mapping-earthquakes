// Add console.log to check if code is working
console.log("working");

// Create map object with center and zoom level
let map = L.map("mapid").setView([40.7, -94.5], 4);

// Get data from cities.js
let cityData = cities;

// Loop through cities array and create one marker for each city
cityData.forEach(function(city) {
    console.log(city);
    L.circleMarker(city.location, {
        radius: city.population/200000,
        color: "orange",
        lineweight: 4,
        fillColor: "#ffffa1"
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

// Create tile layer to be background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/dark-v10",
    accessToken: mapboxAPIKey
});

// Add 'graymap' tile layer to map
streets.addTo(map);