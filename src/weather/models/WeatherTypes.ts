export interface Alert {
    event: string;
    area: string;
    severity: string;
    description: string;
    instruction: string;
}

export interface Forecast {
    period: string;
    temperature: number;
    temperatureUnit: string;
    windSpeed: string;
    windDirection: string;
    description: string;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface WeatherError {
    code: number;
    message: string;
} 