export const config = {
  openWeather: {
    apiKey: process.env.OPENWEATHER_API_KEY,
    apiBase: "https://api.openweathermap.org/data/2.5",
    units: "metric"
  },
  server: {
    name: "weather",
    version: "1.0.0"
  }
}; 