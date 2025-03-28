export interface Location {
    id: string;
    name: string;
    country: string;
    lat: number;
    lon: number;
}

export interface WeatherData {
    location: Location;
    current: {
        temp: number;        // 温度
        humidity: number;    // 湿度
        windSpeed: number;   // 风速
        windDir: string;     // 风向
        condition: string;   // 天气状况
        updateTime: string;  // 更新时间
    };
    forecast: Array<{
        date: string;
        tempMax: number;
        tempMin: number;
        condition: string;
    }>;
}

export interface WeatherError {
    code: number;
    message: string;
} 