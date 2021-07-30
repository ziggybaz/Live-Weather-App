const { response } = require('express');
const express = require('express');
const { STATUS_CODES } = require('http');
const app = express();
const bodyParser = require('body-parser')
const https = require('https');
const port = 3000


app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {

    console.log(req.body.cityName)

    const apiKey = "e0e5d52aed43e7421f20673353bb2b4d";
    const cityName = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=metric"

    https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
          const weatherData = JSON.parse(data);
          console.log(weatherData)

          const description = weatherData.weather[0].description;
          console.log(description)

          const icon = weatherData.weather[0].icon;
          const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

          res.write("<h1>The forecast today says that in "+cityName+" it will be " + description +" .</h1>")
          res.write("<p>Im just learning like everyone else.</p>")
          res.write("<img src ="+imageUrl+">")
          
          res.send();
      });
        
        
    });

})



app.listen(port, function () {
    console.log("Twende kazi sasa.")
})











// app.get("/", function (req, res) {

//     const url = "https://the apicodeinquestio.
//     https.get(url, function (response) {
//         console.log(response.statusCode)

//     response.on('data', function (data) {
//         const appBuilt = JSON.parse(data);
//         console.log(appBuilt)

//         const song = appBuilt.main.song
//         console.log(song)

//     })
        
//     })


//     res.send("Just trying to see if i've mastered the parsing to JSON code.")
// })