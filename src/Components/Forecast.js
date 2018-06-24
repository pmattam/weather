import React, { Component } from 'react';
import { getWeatherForecast } from '../lib/index';

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: {}
    };
  }

  componentDidMount() {
    this.weatherInfo();
  }

  weatherInfo = () => {
    getWeatherForecast(this.props.lat, this.props.lon)
      .then(wData => {
        console.log('data', wData.list);
        console.log(wData.list[0].dt_txt.slice(0, 10));
        let apiData = {};
        wData.list.filter(eachForecast => {
          let keyDt = eachForecast.dt_txt.slice(0, 10);
          (keyDt in apiData) ? apiData[keyDt].push(eachForecast) : apiData[keyDt] = [eachForecast];
        });
        this.setState({
          forecastData: apiData
        })
      });
  };

  render() {
    let { forecastData } = this.state;
    let forecastDataKeysArr = Object.keys(forecastData); 
    let temp_min = 100;
    let temp_max = 0;
    console.log(forecastData);
    console.log(forecastDataKeysArr);
    return(
      <div>
        <div>
          {
            forecastDataKeysArr.forEach(eachKey => {
              forecastData[eachKey].forEach(eachForecast => {
                eachForecast.main.temp_min < temp_min ? temp_min = eachForecast.main.temp_min : temp_min
              })
            })
          }
        </div>
      </div>
    )
  }
}

export default Forecast;