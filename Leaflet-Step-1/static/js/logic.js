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
          fillOpacity: 1,
          fillColor: depthColor(feature.properties.mag),
          color: "black",
          radius: magRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }

  // set radiuss from magnitude
    function magRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

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
        + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
      }
    }).addTo(myMap);
  
    // an object legend
    var legend = L.control({
      position: "bottomright"
    });
  
    // details for the legend
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
  
      var grades = [0, 1, 2, 3, 4, 5];
      div.innerHTML += "<h4 style='text-align: center'>Magnitude</h4>"
      
  
      // Looping through
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
    // Finally, we our legend to the map.
    legend.addTo(myMap);
  });  
   
  