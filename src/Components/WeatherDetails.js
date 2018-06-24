import React from 'react';

let WeatherDetails = ({lat, lon, temp, weatherCondition, sunrise, sunset, imgSrc, icon, displayCelsius, displayFarenheit}) => 
<div>
  <div>
    {
      icon 
      && 
      <img src={imgSrc} alt={icon} className='weather-icon'/>
    }
    {
      temp
    }
  </div>
  <div>
    {
      (temp.slice(temp.length-2) === '°F') ? <button onClick={displayCelsius}>°C</button> : <button onClick={displayFarenheit}>°F</button>
    }
  </div>
  <div>
    {
      weatherCondition
    }
  </div>
  <div>
    Sunrise
    <p>{sunrise}</p>
  </div>
  <div>
    Sunset
    <p>{sunset}</p>
  </div>
</div>

export default WeatherDetails;