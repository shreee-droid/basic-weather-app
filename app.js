const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
   res.sendFile(__dirname + "/index.html");      
});

app.post("/", function (req, res){
    
    
 const query = req.body.cityName;
 const apiKey = "9559fd54c8ddcfa8297334ea07af65a6";
 const units = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + units;

   https.get(url, function(response){
   console.log(response.statusCode);

   response.on("data", function(data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0];
    const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

    res.write("<h1>The temp of " +query+ " is " + temp + " degree Celcius</h1>");
    res.write("<h2>The weather of " +query+ " is "+ description + ".</h2>");
    res.write("<img src=" + imageUrl + ">");
    res.end(); 
     })
   })
})







app.listen(3000, function(){
  console.log("Server is running on port 3000");    
})