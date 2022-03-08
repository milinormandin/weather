const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the zip from the html form, display in // console. Takes in as string, ex. for zip 02139
        var cityID = String(req.body.cityInput);
        console.log(req.body.cityInput);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
  // Using my api key
        const apiKey = "3ada98762763443f14a4af376b6cf373";
        const url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityID +  "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
          console.log(weatherData)
          
            const temp = weatherData.main.temp;
            const cityID = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

          // getting humidity
          const humidity = weatherData.main.humidity;

          // getting windspeed
          const windspeed = weatherData.wind.speed;

          // getting wind degree
          const wind_deg = weatherData.wind.deg;

          //getting cloudiness
          const cloudiness = weatherData.clouds.all;
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Temperature in " + cityID + " " + " is " + temp + " Degrees Fahrenheit<h2>");
          // displating humidity
            res.write("<h2>The Humidity is " + humidity + "% </h2>");
          // Displaying windspeed and direction
            res.write("<h2>The Windspeed is " + windspeed + " miles/hour with a " + wind_deg + " degree wind direction. </h2>" );

              // Displaying cloudiness
            res.write("<h2>Cloudiness is " + cloudiness + "% </h2>" );
            res.write("<br><img src=" + imageURL +">");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
