// Add console.log to check if code is working
console.log("working");

// Create light view tile layer to be default background of map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/light-v10",
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
    "Day Navigation": light,
    "Night Navigation": dark
};

// Create map object with center, zoom level, and default layer
let map = L.map("mapid", {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [dark]
});

// Pass map layers into layers control and add layers control to map
L.control.layers(baseMaps).addTo(map);

// Access Toronto airline routes GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/jenamis/mapping-earthquakes/main/torontoRoutes.json";

// Create object with line style parameters
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Get GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});

