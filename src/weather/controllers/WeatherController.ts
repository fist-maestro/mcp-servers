import { Request, Response } from 'express';
import { WeatherService } from '../services/WeatherService';

export class WeatherController {
    private weatherService: WeatherService;

    constructor() {
        this.weatherService = new WeatherService();
    }

    async getAlerts(req: Request, res: Response): Promise<void> {
        try {
            const { state } = req.params;
            if (!state || state.length !== 2) {
                res.status(400).json({ error: '请提供有效的两字母州代码' });
                return;
            }

            const alerts = await this.weatherService.getAlerts(state.toUpperCase());
            res.json(alerts);
        } catch (error) {
            res.status(500).json({ error: '获取天气预警时发生错误' });
        }
    }

    async getForecast(req: Request, res: Response): Promise<void> {
        try {
            const lat = parseFloat(req.query.lat as string);
            const lon = parseFloat(req.query.lon as string);

            if (isNaN(lat) || isNaN(lon)) {
                res.status(400).json({ error: '请提供有效的经纬度' });
                return;
            }

            const forecast = await this.weatherService.getForecast({ latitude: lat, longitude: lon });
            res.json(forecast);
        } catch (error) {
            res.status(500).json({ error: '获取天气预报时发生错误' });
        }
    }
} 