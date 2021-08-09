// USGS url for  for "All earthquakes from the Past 7 Days"
var eartquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([38.05, -118.24],4.5);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
