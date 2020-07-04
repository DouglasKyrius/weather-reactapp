import React, { useState } from 'react';
const api = {
  key: "c88e4b3fb0e4235c997fb8cb98ff1a40",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(response => {          
          setWeather(response);
          setQuery('');
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }  

  console.log(weather);
  
  return (
    <div className={
      (weather.main !== undefined 
        ? (weather.main.temp > 16 
          ? 'app warm' 
          : 'app')
        : 'app'
      )}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {weather.main !== undefined ? (
          <div>
            <div className="location-box">
              <div className="location"> {weather.name}, {weather.sys.country} </div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">Smallville, DC</div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>

            <div className="weather-box">
              <div className="temp">15°C</div>
              <div className="weather">Sunny</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
