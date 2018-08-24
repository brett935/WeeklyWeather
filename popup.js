
document.addEventListener('DOMContentLoaded', function() {
  var zipcode = localStorage.zipcode;
  var lattitude = "";
  var longitude = "";
  var city = "";
  
  $.getJSON( "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + ",US", function( data ) {
    console.log(data);
    city = data.results[0].address_components[1].long_name;
    lattitude = data.results[0].geometry.location.lat;
    longitude = data.results[0].geometry.location.lng;

    $("#forecast").append("<h1>" + city + " Forecast</h1>");

    $.getJSON( "https://api.weather.gov/points/" + lattitude + "," + longitude + "/forecast", function( data ) {
      console.log(data);

      var periods = data.properties.periods;
      $.each(periods, function(i, item) {
        if (!item.temperatureTrend) item.temperatureTrend = "None"; //fix trend appearing as null

        var data = "<div class='period'>" + 
          "<h2>" + item.name + "</h2>" + 
          "<image src =" + item.icon +"></image>" + 
          "<div class='info'>" +
          "<h4>" + item.shortForecast + "</h4>" +
          "<p>Temperature: " + item.temperature + " " + item.temperatureUnit + "</p>" + 
          "<p>Trend: " + item.temperatureTrend + "</p>" + 
          "<p>Wind: " + item.windSpeed + " -- " + item.windDirection + "</p>" +
          "</div>" +
          "</div>";

          $("#forecast").append(data);
      });
    });
    $.getJSON( "https://api.weather.gov/points/" + lattitude + "," + longitude, function( data ) { 
      var radarStation = data.properties.radarStation;
        $.getJSON( "https://api.weather.gov/stations/" + radarStation + "/observations/current", function( data ) { 
          debugger;
          var degreesCelcius = data.properties.temperature.value;
          var degreesFahrenheit = celciusToFahrenheit(degreesCelcius);
          console.log("Current Temperature: " + degreesFahrenheit);
          chrome.browserAction.setBadgeText({
            text: degreesFahrenheit.toString().substring(0,2)
          }); //display current temperature in icon badge
        });
    });
  }); 
});
// window.setInterval(function(){
// alert('interval');
// }, 5000);
function celciusToFahrenheit(degreesCelcius) {
  return degreesCelcius * 9 / 5 + 32;
}
function fahrenheitToCelcuis(degreesFahrenheit) {
  return (degreesFahrenheit - 32) * 5 / 9;
}