import React, { Component } from 'react';
import './App.css';
import WeatherDetails from './Components/WeatherDetails';
import Forecast from './Components/Forecast';
import { getLatAndLon, getCurrentWeather } from './lib/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      temp: '',
      tempInFar: '',
      tempInCel: '',
      weatherCondition: '',
      sunrise: '',
      sunset: '',
      icon: '',
      renderForecast: false
    };
  }

  componentDidMount() {
    this.weatherInfo();
  }

  weatherInfo = () => {
    getLatAndLon()
      .then(data => {
        getCurrentWeather(data.lat, data.lon)
          .then(wData => {
            console.log(wData);
            let date = new Date(parseInt(wData.dt, 10) * 1000);
            console.log('dt', date.toString());
            let sunrise = this.convertSunriseOrSunset(wData.sys.sunrise);
            let sunset = this.convertSunriseOrSunset(wData.sys.sunset);
            let degC = this.convertTempIntoDegC(wData.main.temp).toString().slice(0, 5);
            this.setState({
              lat: `${wData.coord.lat}`,
              lon: `${wData.coord.lon}`,
              temp: `${wData.main.temp} °F`,
              tempInFar: `${wData.main.temp} °F`,
              tempInCel: degC + ' °C',
              weatherCondition: `${wData.weather[0].main} - ${wData.weather[0].description}`,
              sunrise: sunrise,
              sunset: sunset,
              icon: wData.weather[0].icon
            });
          });
      });
  };
  
  convertTempIntoDegC = tempInFar => (tempInFar - 32) * 5/9;

  convertSunriseOrSunset = unixTimeStamp => {
    let date = new Date(parseInt(unixTimeStamp, 10) * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  displayCelsius = () => {
    this.setState({
      temp: this.state.tempInCel
    })
  };

  displayFarenheit = () => {
    this.setState({
      temp: this.state.tempInFar
    })
  };

  handleShowForecast = () => {
    this.setState({
      renderForecast: true
    })
  };

  handleHideForecast = () => {
    this.setState({
      renderForecast: false
    });
  };

  render() {
    console.log(this.state.lat);
    console.log(this.state.lon);
    let imgSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;
    let {lat, lon, temp, weatherCondition, sunrise, sunset, icon} = this.state;
    return (
      <div className="App">
        <h1>Weather</h1>
        <WeatherDetails
          lat={lat}
          lon={lon}
          temp={temp}
          weatherCondition={weatherCondition}
          sunrise={sunrise}
          sunset={sunset}
          imgSrc={imgSrc}
          icon={icon}
          displayCelsius={this.displayCelsius}
          displayFarenheit={this.displayFarenheit}
        />
        <div>
          {
            !(this.state.renderForecast)
            ?
            <button onClick={this.handleShowForecast}>5 Day Forecast</button>
            :
            <button onClick={this.handleHideForecast}>Hide Forecast</button>
          }
        </div>
        <div>
          {
            this.state.renderForecast
            &&
            <Forecast
              lat={lat}
              lon={lon}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
