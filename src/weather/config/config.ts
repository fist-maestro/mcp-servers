export const config = {
    server: {
        port: process.env.WEATHER_PORT || 3002,
        host: process.env.WEATHER_HOST || 'localhost'
    },
    api: {
        // 使用国家气象局 API
        baseUrl: 'https://api.weather.gov',
        userAgent: 'mcp-weather-server/1.0'
    },
    // 缓存配置
    cache: {
        ttl: 1800 // 缓存时间 30 分钟
    }
}; 