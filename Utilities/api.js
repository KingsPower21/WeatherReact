export const fetchOpenWeatherCity = async city => {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c16561a4273e94948971b4fde7dc892c&units=imperial`,
    );

    const { main, weather, name, wind } = await response.json();

    return {
        location: name,
        weather: weather[0].main,
        temperature: main.temp,
        tempMin: main.temp_min,
        tempMax: main.temp_max,
        windSpeed: wind.speed,
    };
};

export const fetchOpenWeatherGPS = async coords => {
    console.log(coords);
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&APPID=c16561a4273e94948971b4fde7dc892c&units=imperial`,
    );
    const { main, weather, name, wind } = await response.json();

    return {
        location: name,
        weather: weather[0].main,
        temperature: main.temp,
        tempMin: main.temp_min,
        tempMax: main.temp_max,
        windSpeed: wind.speed,
    };
};
