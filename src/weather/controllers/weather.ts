import { WeatherService } from '../service/weather.js';

export class WeatherController {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = new WeatherService();
  }

  async getCurrentWeather(city: string, country?: string): Promise<string> {
    const weatherData = await this.weatherService.getCurrentWeather(city, country);

    if (!weatherData) {
      return `Failed to retrieve weather data for ${country ? `${city}, ${country}` : city}`;
    }

    return [
      `Current weather in ${weatherData.name}, ${weatherData.sys.country}:`,
      `Temperature: ${weatherData.main.temp}°C (Feels like: ${weatherData.main.feels_like}°C)`,
      `Conditions: ${weatherData.weather[0].main} - ${weatherData.weather[0].description}`,
      `Humidity: ${weatherData.main.humidity}%`,
      `Wind Speed: ${weatherData.wind.speed} m/s`,
      `Pressure: ${weatherData.main.pressure} hPa`,
    ].join("\n");
  }

  async getForecast(city: string, country?: string): Promise<string> {
    const forecastData = await this.weatherService.getForecast(city, country);

    if (!forecastData) {
      return `Failed to retrieve forecast data for ${country ? `${city}, ${country}` : city}`;
    }

    const forecasts = forecastData.list
      .filter((_, index) => index % 8 === 0) // Get one forecast per day
      .map(forecast => [
        `\nDate: ${forecast.dt_txt.split(" ")[0]}`,
        `Temperature: ${forecast.main.temp}°C (Feels like: ${forecast.main.feels_like}°C)`,
        `Conditions: ${forecast.weather[0].main} - ${forecast.weather[0].description}`,
        `Humidity: ${forecast.main.humidity}%`,
        `Wind Speed: ${forecast.wind.speed} m/s`,
        "---"
      ].join("\n"));

    return `5-day forecast for ${forecastData.city.name}, ${forecastData.city.country}:\n${forecasts.join("\n")}`;
  }
} 