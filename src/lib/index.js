export let getLatAndLon = () =>
    fetch('http://ip-api.com/json', {
        method: 'GET'
    })
    .then(res => res.json());

export let getCurrentWeather = (lat, lon) =>
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=ba2df679e012f3fab17e2b32649cd410`, {
        method: 'GET'
    })
    .then(res => res.json());

export let getWeatherForecast = (lat, lon) =>
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=ba2df679e012f3fab17e2b32649cd410`, {
        method: 'GET'
    })
    .then(res => res.json());