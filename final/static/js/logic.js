/// Add console.log to check if code is working
console.log("working");

// Create street view tile layer to be default background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: mapboxAPIKey
});

// Create satellite view tile layer to be option for map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/satellite-streets-v11",
        accessToken: mapboxAPIKey
    });

// Create dark view tile layer to be option for map
let night = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/navigation-night-v1",
        accessToken: mapboxAPIKey
    });

// Create map object with center, zoom level, and default layer
let map = L.map("mapid", {
  center: [40.7, -94.5],
  zoom: 3,
  layers: [streets]
});

// Create base layer that holds three maps
let baseMaps = {
  "Day": streets,
  "Night": night,
  "Satellite": satelliteStreets
};

// Create earthquake, tectonic plate, and major earthquake layers
let allEarthquakes = new L.layerGroup();
let tectonicPlates = new L.layerGroup();
let majorEarthquakes = new L.layerGroup();

// Define object that contains overlays
let overlays = {
  "Tectonic Plates": tectonicPlates,
  "All Earthquakes": allEarthquakes,
  "Major Earthquakes": majorEarthquakes
};

// Pass map layers into layers control and add layers control to map
L.control.layers(baseMaps, overlays).addTo(map);

// ALL EARTHQUAKES
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
  L.geoJson(data, {
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
  }).addTo(allEarthquakes);

  // Add earthquake layer to map
  allEarthquakes.addTo(map);
});

// MAJOR EARTHQUAKES
// Retrieve major earthquake GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {

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
    if (magnitude > 6) {
      return "#af0038"
    }
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    return "#ea822c";
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
  L.geoJson(data, {
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
  }).addTo(majorEarthquakes);

  // Add earthquake layer to map
  majorEarthquakes.addTo(map);
});

// Create legend control object
let legend = L.control({
  position: "bottomright"
});

// Add details for legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend")
  const magnitudes = [0, 1, 2, 3, 4, 5, 6];
  const colors = [
  "#98ee00",
  "#d4ee00",
  "#eecc00",
  "#ee9c00",
  "#ea822c",
  "#ea2c2c",
  "#af0038"
  ];
    
  // Loop through intervals to generate label with colored square for each interval
  for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " + 
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};
  
// Add legen to map
legend.addTo(map);

// TECTONIC PLATES
// Retrieve tectonic plate GeoJSON data
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {

  // Create function for style parameters
  function styleInfo(feature) {
    return {
      color: "#ea2c2c",
      weight: 2
    };
  }

  // Create GeoJSON layer with retrieved data
  L.geoJson(data, {
      style: styleInfo,
  }).addTo(tectonicPlates);

  // Add tectonic plate layer to map
  tectonicPlates.addTo(map);
});