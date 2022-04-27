// Add console.log to check if code is working
console.log("working");

// Create light view tile layer to be default background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: mapboxAPIKey
});

// Create dark view tile layer to be option for map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/satellite-streets-v11",
        accessToken: mapboxAPIKey
    });

// Create base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create map object with center, zoom level, and default layer
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});

// Pass map layers into layers control and add layers control to map
L.control.layers(baseMaps).addTo(map);

// Access Toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/jenamis/mapping-earthquakes/main/torontoNeighborhoods.json";

// Create object with style parameters
let myStyle = {
    color: "blue",
    fillColor: "#ffffa1",
    weight: 1
}

// Get GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h3> Neighborhood: " + features.properties.AREA_NAME + "</h3>");
        }
    }).addTo(map);
});

