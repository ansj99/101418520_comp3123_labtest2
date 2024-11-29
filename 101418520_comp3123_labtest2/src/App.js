import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Toronto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetching weather data from OpenWeatherMap API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c143a951555a05054489ae6929fa3ba`
        );
        setWeather(response.data);
      } catch (err) {
        setError("Error fetching weather data");
      }
      setLoading(false);
    };
    fetchData();
  }, [city]);

  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  //  mock data for forecast
  const weeklyForecast = [
    { day: "Mon", temp: "-5", icon: "13d" }, 
    { day: "Tue", temp: "-3", icon: "03d" }, 
    { day: "Wed", temp: "-7", icon: "50d" }, 
    { day: "Thu", temp: "-8", icon: "13d" },
    { day: "Fri", temp: "-10", icon: "04d" }, 
    { day: "Sat", temp: "-6", icon: "10d" }, 
    { day: "Sun", temp: "-4", icon: "01d" }, 
  ];

  // Create the weather icon URL
  const getIconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
      </div>

      {weather && (
        <div className="weather-info">
          <div className="current-weather">
            <div className="left">
              <h2>Thursday</h2>
              <p>November 28th</p>
              <p>{city}</p>
              <h1>{kelvinToCelsius(weather.main.temp)}°C</h1>
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="right">
              <p>Predictability: 67%</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <p>Air Pressure: {weather.main.pressure} mb</p>
              <p>Max Temp: {kelvinToCelsius(weather.main.temp_max)}°C</p>
              <p>Min Temp: {kelvinToCelsius(weather.main.temp_min)}°C</p>
            </div>
          </div>

          <div className="weekly-forecast">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p className="day">{day.day}</p>
                <img src={getIconUrl(day.icon)} alt="weather icon" />
                <p className="temp">{day.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
