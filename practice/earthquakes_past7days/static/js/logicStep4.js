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
    "Satellite": satelliteStreets
};

// Create earthquake layer
let earthquakes = new L.layerGroup();

// Define object that contains overlays
let overlays = {
    "Earthquakes": earthquakes
};

// Create map object with center, zoom level, and default layer
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [satelliteStreets]
});

// Pass map layers into layers control and add layers control to map
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve earthquake GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

    // Create function for style parameters
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // Create function to determine color based on earthquake magnitude
    function getColor(magnitude) {
        if (magnitude > 5) {
          return "#ea2c2c";
        }
        if (magnitude > 4) {
          return "#ea822c";
        }
        if (magnitude > 3) {
          return "#ee9c00";
        }
        if (magnitude > 2) {
          return "#eecc00";
        }
        if (magnitude > 1) {
          return "#d4ee00";
        }
        return "#98ee00";
    }  

    // Create function to determine radius based on earthquake magnitude
    // Earthquakes with magnitude 0 will be plotted with radius of 1
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // Create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        // Turn each feature into circleMarker on map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // Set style for each circleMarker using styleInfo function
        style: styleInfo,
        // Create popup for each circleMarker with magnitude and location of earthquake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);
    
    // Add earthquake layer to map
    earthquakes.addTo(map);
});

