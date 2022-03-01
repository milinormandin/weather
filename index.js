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
    
    // takes in latitude longitude
        var lat = String(req.body.lat);
        console.log(lat);

          var lat = String(req.body.long);
        console.log(lat);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
  // Using my api key
        const apiKey = "3ada98762763443f14a4af376b6cf373";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +  "&units=" + units + "&APPID=" + apiKey;
    
    // // this gets the data from Open WeatherPI
    // https.get(url, function(response){
    //     console.log(response.statusCode);
        
    //     // gets individual items from Open Weather API
    //     response.on("data", function(data){
    //         const weatherData = JSON.parse(data);
    //       console.log(weatherData)
          
    //         const temp = weatherData.main.temp;
    //         const city = weatherData.name;
    //         const weatherDescription = weatherData.weather[0].description;
    //         const icon = weatherData.weather[0].icon;
    //         const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    //       // getting humidity
    //       const humidity = weatherData.main.humidity;

    //       // getting windspeed
    //       const windspeed = weatherData.wind.speed;
            
    //         // displays the output of the results
    //         res.write("<h1> The weather is " + weatherDescription + "<h1>");
    //         res.write("<h2>The Temperature in " + city + " " + " is " + temp + " Degrees Fahrenheit<h2>");
    //       // displating windspeed and humidity
    //         res.write("<h2>The Humidity is " + humidity + " " + " the windspeed is  " + windspeed);
    //         res.write("<br><img src=" + imageURL +">");
    //         res.send();
    //     });
    // });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
