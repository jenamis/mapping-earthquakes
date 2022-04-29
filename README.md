# Mapping Earthquakes

## Overview
The purpose of this project was to create a map showing earthquakes around the world from within the last seven days. The project utilized JavaScript and the D3.js library to retrieve GeoJSON earthquake data and the Leaflet library to plot the data on a Mapbox map and create interactive map layers. 

The files used to create the map can be found here:
-    [JavaScript file](final/static/js/logic.js)
-    [HTML file](final/index.html)
-    [CSS style sheet](final/static/css/style.css)  

## Map Components

### Base Layers
The user can select between three Mapbox base layer styles: Day (Mapbox Streets), Night (Mapbox Navigation Night), and Satellite (Mapbox Satellite Streets).  

### Tectonic Plates Layer
The Tectonic Plates layer utilizes GeoJSON data retrieved from this [GitHub repository]( https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json).

### All Earthquakes Layer
The All Earthquakes layer utilizes data retrieved from the United States Geological Survey’s real-time [GeoJSON summary feed for earthquakes within the past seven days]( https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson). Differences in earthquake magnitude are shown with marker size and color.

### Major Earthquakes Layer
The Major Earthquakes layer utilizes data retrieved from the United States Geological Survey’s real-time [GeoJSON summary feed for earthquakes with a magnitude of 4.5 or greater within the past seven days] (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson). As with the All Earthquakes layer, differences in earthquake magnitude are shown with marker size and color.
