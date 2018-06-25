import React, { Component } from 'react';
import { getWeatherForecast } from '../lib/index';

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: []
    };
  }

  componentDidMount() {
    this.weatherInfo();
  }

  weatherInfo = () => {
    getWeatherForecast(this.props.lat, this.props.lon)
      .then(wData => {
        let apiData = {};
        wData.list.forEach(eachForecast => {
          let keyDt = eachForecast.dt_txt.slice(0, 10);
          if(keyDt in apiData) {
            apiData[keyDt].weatherList.push(eachForecast);
            if(apiData[keyDt].temp_max < eachForecast.main.temp_max) {
              apiData[keyDt].temp_max = eachForecast.main.temp_max;
            }
            if(apiData[keyDt].temp_min > eachForecast.main.temp_min) {
              apiData[keyDt].temp_min = eachForecast.main.temp_min;
            }
          } else {
            apiData[keyDt] = {weatherList: [eachForecast], temp_max: eachForecast.main.temp_max, temp_min: eachForecast.main.temp_min};
          }
        });
        return apiData;
      })
      .then(apiData => {
        let forecastDataKeysArr = Object.keys(apiData);
        let finalData = [];
        forecastDataKeysArr.forEach(eachKey => {
          apiData[eachKey].weatherList.forEach(weatherItem => {
            if(weatherItem.main.temp_max === apiData[eachKey].temp_max) {
              finalData.push({
                dt: weatherItem.dt, desc: weatherItem.weather[0].description, 
                icon: weatherItem.weather[0].icon, dt_txt: weatherItem.dt_txt, 
                temp_max: apiData[eachKey].temp_max, temp_min: apiData[eachKey].temp_min
              })
            }
          });
        });
        this.setState({
          forecastData: finalData
        })
      });
  };

  getDay = (dt) => {
    let date = new Date(parseInt(dt, 10) * 1000);
    return date.toString().slice(0, 3);
  };

  render() {

    let { forecastData } = this.state;
    
    return(
      <div className='forecast'>       
          {
            forecastData.map((forecast, i) => 
              <div key={i} className='fdiv'>
                <div>{this.getDay(forecast.dt)}</div>
                <div>{forecast.desc}</div>
                <div>
                  <img src={`http://openweathermap.org/img/w/${forecast.icon}.png`} alt={forecast.icon} />
                </div>
                <div>{forecast.temp_max}</div>
                <div>{forecast.temp_min}</div>
              </div>)
          }
      </div>
    );
  }
}

export default Forecast;