import axios from 'axios';
import { config } from '../config/index.js';
import type { WeatherData, ForecastData } from './types.js';

export class WeatherService {
  private readonly apiKey: string;
  private readonly apiBase: string;
  private readonly units: string;

  constructor() {
    if (!config.openWeather.apiKey) {
      throw new Error('OpenWeather API key is required');
    }
    this.apiKey = config.openWeather.apiKey;
    this.apiBase = config.openWeather.apiBase;
    this.units = config.openWeather.units;
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any>): Promise<T | null> {
    try {
      const response = await axios.get(`${this.apiBase}/${endpoint}`, {
        params: {
          ...params,
          appid: this.apiKey,
          units: this.units
        }
      });
      return response.data as T;
    } catch (error) {
      console.error("Error making OpenWeather request:", error);
      return null;
    }
  }

  async getCurrentWeather(city: string, country?: string): Promise<WeatherData | null> {
    const query = country ? `${city},${country}` : city;
    return this.makeRequest<WeatherData>("weather", { q: query });
  }

  async getForecast(city: string, country?: string): Promise<ForecastData | null> {
    const query = country ? `${city},${country}` : city;
    return this.makeRequest<ForecastData>("forecast", { q: query });
  }
}