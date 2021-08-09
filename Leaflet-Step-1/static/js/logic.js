// USGS url for  for "All earthquakes from the Past 7 Days"
var eartquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map", {
    center: [38.05, -118.24],
    zoom: 4.3
  });
  

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Perform a GET request to the query URL/
d3.json(eartquakeUrl).then(function (data) {
     console.log(data)

     //data markers should reflect the magnitude of the earthquake by their size and depth of the earthquake by color. 
     //Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.
     function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 0.8,
          fillColor: depthColor(feature.geometry.coordinates[2]),
          color: "black",
          radius: magRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
      
    // Determine the marker color by depth
    function depthColor(depth) {
        switch(true) {
        case depth > 400:
            return "purple";
        case depth > 300:
             return "darkred";
        case depth > 200:
            return "red";     
        case depth > 100:
            return "orangered";
        case depth > 70:
            return "orange";
        case depth > 30:
            return "gold";
        case depth > 10:
            return "yellow";
        default:
            return "lightgreen";
        }
    }  
  // set the radius from magnitude
    function magRadius(magnitude) {
        if (magnitude === 0) {return 1;}
        return magnitude * 4;
     }
    
     // GeoJSON layer
    L.geoJson(data, {
      // Maken cricles
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      // cirecle style
      style: styleInfo,
      // popup for each marker
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: "
        + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + " </p><p>Depth: "+feature.geometry.coordinates[2]+"</p>");
      }
    }).addTo(myMap);
  
    // an object legend
    var legend = L.control({
      position: "bottomleft"
    });
  
    // details for the legend
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
  
      var depth = [400, 300, 200, 100, 70, 30, 10, -5];
      div.innerHTML += "<h4 style='text-align: center'>Depth Legend</h4>"

      //Legend colors
      var colors = ["purple","darkred","red","orangered","orange","gold","yellow","lightgreen"]
  
      // Looping through the depths array to create the legend
      for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
          "<i style='background: " + colors[i]  + "'></i> " +
          depth[i] + (depth[i + 1] ? "&ndash;" + depth[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
    // add legend to the map.
    legend.addTo(myMap);
  });  
   
  