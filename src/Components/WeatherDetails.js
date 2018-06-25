import React from 'react';

let WeatherDetails = ({lat, lon, temp, weatherCondition, sunrise, sunset, imgSrc, icon, displayCelsius, displayFarenheit}) => 
<div className='tier'>
  <div className='wd icon'>
    {
      icon 
      && 
      <img src={imgSrc} alt={icon} />
    }
  </div>
  <div className='temp-degBt'>
    <div className='wd temp'>
    {
        temp
    }
    </div>
    <div className='wd degBt'>
      {
        (temp.slice(temp.length-2) === '°F') ? <button className='degBt1' onClick={displayCelsius}>°C</button> : <button className='degBt2' onClick={displayFarenheit}>°F</button>
      }
    </div>
  </div>
  <div className='wd wDesc'>
    {
      weatherCondition
    }
  </div>
  <div className='wd wSR'>
    <div className='wSR1'>Sunrise</div>
    <div className='wSR2'>{sunrise}</div>
  </div>
  <div className='wd wSS'>
    <div className='wSS1'>Sunset</div>
    <div className='wSS2'>{sunset}</div>
  </div>
</div>

export default WeatherDetails;