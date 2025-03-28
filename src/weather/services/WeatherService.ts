import axios from 'axios';
import { config } from '../config/config';
import { Alert, Forecast, Location, WeatherError } from '../models/WeatherTypes';

// 添加类型定义
interface FeatureProperties {
    event: string;
    areaDesc: string;
    severity: string;
    description: string;
    instruction: string;
}

interface Feature {
    properties: FeatureProperties;
}

interface ForecastPeriod {
    name: string;
    temperature: number;
    temperatureUnit: string;
    windSpeed: string;
    windDirection: string;
    detailedForecast: string;
}

export class WeatherService {
    private cache: Map<string, { data: any; timestamp: number }>;

    constructor() {
        this.cache = new Map();
    }

    private isCacheValid(timestamp: number): boolean {
        return Date.now() - timestamp < config.cache.ttl * 1000;
    }

    private async makeRequest(url: string): Promise<any> {
        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': config.api.userAgent,
                    'Accept': 'application/geo+json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`API 请求失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }

    async getAlerts(state: string): Promise<Alert[] | WeatherError> {
        try {
            const cacheKey = `alerts_${state}`;
            const cached = this.cache.get(cacheKey);

            if (cached && this.isCacheValid(cached.timestamp)) {
                return cached.data;
            }

            const url = `${config.api.baseUrl}/alerts/active/area/${state}`;
            const data = await this.makeRequest(url);

            // 修复这里的类型
            const alerts = data.features.map((feature: Feature) => ({
                event: feature.properties.event,
                area: feature.properties.areaDesc,
                severity: feature.properties.severity,
                description: feature.properties.description,
                instruction: feature.properties.instruction
            }));

            this.cache.set(cacheKey, {
                data: alerts,
                timestamp: Date.now()
            });

            return alerts;
        } catch (error) {
            return {
                code: 500,
                message: `获取天气预警失败: ${error instanceof Error ? error.message : '未知错误'}`
            };
        }
    }

    async getForecast(location: Location): Promise<Forecast[] | WeatherError> {
        try {
            const cacheKey = `forecast_${location.latitude}_${location.longitude}`;
            const cached = this.cache.get(cacheKey);

            if (cached && this.isCacheValid(cached.timestamp)) {
                return cached.data;
            }

            const pointsUrl = `${config.api.baseUrl}/points/${location.latitude},${location.longitude}`;
            const pointsData = await this.makeRequest(pointsUrl);
            const forecastUrl = pointsData.properties.forecast;
            const forecastData = await this.makeRequest(forecastUrl);

            // 修复这里的类型
            const forecasts = forecastData.properties.periods
                .slice(0, 5)
                .map((period: ForecastPeriod) => ({
                    period: period.name,
                    temperature: period.temperature,
                    temperatureUnit: period.temperatureUnit,
                    windSpeed: period.windSpeed,
                    windDirection: period.windDirection,
                    description: period.detailedForecast
                }));

            this.cache.set(cacheKey, {
                data: forecasts,
                timestamp: Date.now()
            });

            return forecasts;
        } catch (error) {
            return {
                code: 500,
                message: `获取天气预报失败: ${error instanceof Error ? error.message : '未知错误'}`
            };
        }
    }
} 