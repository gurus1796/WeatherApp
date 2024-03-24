import React from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

export const WeatherApp = () => {

  let api_key="64a3f66808e5066cc7677f0af4a9defc";
  const [wicon,setWicon] = React.useState(cloud_icon);
  const search = async() =>{
    const element = document.getElementsByClassName("cityInput");
    if(element[0].value === ""){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try{
      let response = await fetch(url);
      let jsonData = await response.json();

      const errTxt = document.getElementsByClassName("errorText");
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      if(jsonData.code === "404" || jsonData.message === "city not found")
      {
        errTxt[0].innerHTML = "Location Not Found. Please try different Location !";
      }
      else{
        errTxt[0].innerHTML="";
      }
      humidity[0].innerHTML = jsonData.main.humidity + " %";
      wind[0].innerHTML = Math.floor(jsonData.wind.speed) + " km/h";
      temperature[0].innerHTML = Math.floor(jsonData.main.temp) + "°c";
      location[0].innerHTML = jsonData.name;

      if(jsonData.weather[0].icon === "01d" || jsonData.weather[0].icon === "01n"){
        setWicon(clear_icon);
      }
      else if(jsonData.weather[0].icon === "02d" || jsonData.weather[0].icon === "02n"){
        setWicon(cloud_icon);
      }
      else if(jsonData.weather[0].icon === "03d" || jsonData.weather[0].icon === "03n"){
        setWicon(drizzle_icon);
      }
      else if(jsonData.weather[0].icon === "04d" || jsonData.weather[0].icon === "04n"){
        setWicon(drizzle_icon);
      }
      else if(jsonData.weather[0].icon === "09d" || jsonData.weather[0].icon === "09n"){
        setWicon(rain_icon);
      }
      else if(jsonData.weather[0].icon === "10d" || jsonData.weather[0].icon === "10n"){
        setWicon(rain_icon);
      }
      else if(jsonData.weather[0].icon === "13d" || jsonData.weather[0].icon === "13n"){
        setWicon(snow_icon);
      }
      else{
        setWicon(clear_icon);
      }
    }
    catch{
      // errTxt[0].innerHTML = "Location Not Found. Please try different Location !";
    }

  }

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search City'/>
        <div className="search-icon" onClick={() => {search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="errorSpace">
        <p className='errorText'></p>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}
