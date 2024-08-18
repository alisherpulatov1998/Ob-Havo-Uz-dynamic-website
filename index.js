import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";

const port = 3000;
const app = express();
const gApiKey = "AIzaSyCxbEnDKOImEG9FWnYmFH8K3e2dTbvp9UQ";
const wApiKey = "51c22f925d68dbbb5c52cbb0ad36cbdd";
// const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gApiKey}`;
// const weatherApi = `https://api.openweathermap.org/data/3.0/onecall?lat=40.5952091&lon=72.1495341&exclude=daily&units=metric&appid=${wApiKey}`;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));







app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

  
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});


app.get("/", async (req, res) => {

    const address = "chicago";
    console.log(address);

    try{
        const resultG = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gApiKey}`);
        console.log(resultG.data.results);
        console.log(resultG.data.results[0].formatted_address);

        const cityNameInfo = resultG.data.results[0].formatted_address;

        const lat = resultG.data.results[0].geometry.location.lat;
        console.log(lat);

        const lon = resultG.data.results[0].geometry.location.lng;
        console.log(lon);


        const resultW = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=daily&units=metric&appid=${wApiKey}`);
        console.log(resultW.data);

        const timezone = resultW.data.timezone;
        const currentDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: `full`,
            timeZone: `${resultW.data.timezone}`,
          }).format(new Date((resultW.data.current.dt * 1000)));

        const currentTime = new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
            timeZone: `${resultW.data.timezone}`,
          }).format(new Date((resultW.data.current.dt * 1000)));

        const sunrise = new Intl.DateTimeFormat('en-US', {
            // dateStyle: `full`,
            timeStyle: 'short',
            timeZone: `${resultW.data.timezone}`,
          }).format(new Date((resultW.data.current.sunrise * 1000)));

        const sunset = new Intl.DateTimeFormat('en-US', {
            // dateStyle: `full`,
            timeStyle: 'short',
            timeZone: `${resultW.data.timezone}`,
          }).format(new Date((resultW.data.current.sunset * 1000)));

        const tempNow = `${Math.floor(resultW.data.current.temp)} C`;
        const feelsLike = `${Math.floor(resultW.data.current.feels_like)} C`;
        const pressure = `${resultW.data.current.pressure} hPa`;
        const humidity = `${resultW.data.current.humidity}%`;
        const clouds = `${resultW.data.current.clouds}%`;
        const visibility = `${resultW.data.current.visibility} m`;
        const windSpeed = `${resultW.data.current.wind_speed} m/s`;
        const windDirection = `${resultW.data.current.wind_deg} °`;
        let weatherNowId = resultW.data.current.weather[0].id;
        const weatherNowMain = `${resultW.data.current.weather[0].main}`;
        const weatherNowDescription = `${resultW.data.current.weather[0].description}`;
        const weatherNowIcon = `${resultW.data.current.weather[0].icon}`;

        console.log(typeof weatherNowId);
        console.log(weatherNowId);

        if (weatherNowId >= 200 && weatherNowId < 300) {
            weatherNowId === "Chaqmoqli";
        } else if (weatherNowId >= 300 && weatherNowId < 400){
            weatherNowId = "Yomg'irli";
        } else if (weatherNowId >= 500 && weatherNowId < 600){
            weatherNowId = "Yomg'ir Qorga aylanishi Kutiladi";
        } else if (weatherNowId >= 600 && weatherNowId < 700){
            weatherNowId = "Qorli";
        } else if (weatherNowId >= 700 && weatherNowId < 800){
            weatherNowId = "Atmosferaga bog'liqli havo. Misol uchun: Tumanli, Changli, Qum Bo'ronili yoki Hattoki Tornadoli bo'lishi mumkin...";
        } else if (weatherNowId === 800){
            weatherNowId = "Musaffo Osmon (Ochiq Havo)";
        } else if (weatherNowId >= 801 && weatherNowId < 900){
            weatherNowId = "Bulutli";
        }

        console.log(weatherNowId);

        

        // const weatherDatas = [city, timezone, currentDate, sunrise, sunset, tempNow, feelsLike, pressure, humidity, clouds, visibility, ];

        res.render("index.ejs", {
            content: "Shahar nomini kiriting!",
            city: cityNameInfo,
            timezone: timezone,
            currentDate: currentDate,
            currentTime: currentTime,
            sunrise: sunrise,
            sunset: sunset,
            tempNow: tempNow,
            feelsLike: feelsLike,
            pressure: pressure,
            humidity: humidity,
            clouds: clouds,
            visibility: visibility,
            windSpeed: windSpeed,
            windDirection: windDirection,
            weatherNowId: weatherNowId,
            weatherNowMain: weatherNowMain,
            weatherNowDescription: weatherNowDescription,
            weatherNowIcon: weatherNowIcon,

        });
        

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
        });
    }
});



app.post("/searchPlace", async (req, res) => {

    const address = req.body.address;
    console.log(address);

    try{
        const resultG = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gApiKey}`);
        console.log(resultG.data.results);
        console.log(resultG.data.results[0].formatted_address);

        const cityNameInfo = resultG.data.results[0].formatted_address;

        const lat = resultG.data.results[0].geometry.location.lat;
        console.log(lat);

        const lon = resultG.data.results[0].geometry.location.lng;
        console.log(lon);


        const resultW = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=daily&units=metric&appid=${wApiKey}`);
        console.log(resultW.data);

        const timezone = resultW.data.timezone;
        const currentDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: `full`,
            timeZone: `${resultW.data.timezone}`,
          }).format(new Date((resultW.data.current.dt * 1000)));

        const currentTime = new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
            timeZone: `${resultW.data.timezone}`,
          }).format(new Date((resultW.data.current.dt * 1000)));

        const sunrise = new Intl.DateTimeFormat('en-US', {
            // dateStyle: `full`,
            timeStyle: 'short',
            timeZone: `${resultW.data.timezone}`,
          }).format(new Date((resultW.data.current.sunrise * 1000)));

        const sunset = new Intl.DateTimeFormat('en-US', {
            // dateStyle: `full`,
            timeStyle: 'short',
            timeZone: `${resultW.data.timezone}`,
          }).format(new Date((resultW.data.current.sunset * 1000)));

        const tempNow = `${Math.floor(resultW.data.current.temp)} C`;
        const feelsLike = `${Math.floor(resultW.data.current.feels_like)} C`;
        const pressure = `${resultW.data.current.pressure} hPa`;
        const humidity = `${resultW.data.current.humidity}%`;
        const clouds = `${resultW.data.current.clouds}%`;
        const visibility = `${resultW.data.current.visibility} m`;
        const windSpeed = `${resultW.data.current.wind_speed} m/s`;
        const windDirection = `${resultW.data.current.wind_deg} °`;
        let weatherNowId = resultW.data.current.weather[0].id;
        const weatherNowMain = `${resultW.data.current.weather[0].main}`;
        const weatherNowDescription = `${resultW.data.current.weather[0].description}`;
        const weatherNowIcon = `${resultW.data.current.weather[0].icon}`;

        console.log(typeof weatherNowId);
        console.log(weatherNowId);

        if (weatherNowId >= 200 && weatherNowId < 300) {
            weatherNowId === "Chaqmoqli";
        } else if (weatherNowId >= 300 && weatherNowId < 400){
            weatherNowId = "Yomg'irli";
        } else if (weatherNowId >= 500 && weatherNowId < 600){
            weatherNowId = "Yomg'ir Kutiladi";
        } else if (weatherNowId >= 600 && weatherNowId < 700){
            weatherNowId = "Qorli";
        } else if (weatherNowId >= 700 && weatherNowId < 800){
            weatherNowId = "Atmosferaga bog'liqli havo. Misol uchun: Tumanli, Changli, Qum Bo'ronili yoki Hattoki Tornadoli bo'lishi mumkin...";
        } else if (weatherNowId === 800){
            weatherNowId = "Musaffo Osmon (Ochiq Havo)";
        } else if (weatherNowId >= 801 && weatherNowId < 900){
            weatherNowId = "Bulutli";
        }

        console.log(weatherNowId);

        

        // const weatherDatas = [city, timezone, currentDate, sunrise, sunset, tempNow, feelsLike, pressure, humidity, clouds, visibility, ];

        res.render("index.ejs", {
            content: "Shahar nomini kiriting!",
            city: cityNameInfo,
            timezone: timezone,
            currentDate: currentDate,
            currentTime: currentTime,
            sunrise: sunrise,
            sunset: sunset,
            tempNow: tempNow,
            feelsLike: feelsLike,
            pressure: pressure,
            humidity: humidity,
            clouds: clouds,
            visibility: visibility,
            windSpeed: windSpeed,
            windDirection: windDirection,
            weatherNowId: weatherNowId,
            weatherNowMain: weatherNowMain,
            weatherNowDescription: weatherNowDescription,
            weatherNowIcon: weatherNowIcon,

        });
        

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: "Shahar nomini tekshiring va qayta kiriting!",
        errorNote: "Agarda kichikroq Tuman yoki Shaharchani qidirayotgan bo'lsangiz hudud nomi bilan birgalikda Tuman yoki Shahar ekanini ham ifodalang.(Misol uchun: Quva Tuman, Asaka Shahar, ...)"
        });
    }
});




app.listen(port, () => {
 console.log(`Server ${port} da ishga tushdi.`);
});



