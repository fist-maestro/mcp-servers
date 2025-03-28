# MCP Weather Service

这是一个基于 Node.js 和 TypeScript 开发的 MCP 天气服务，提供天气预警和预报查询功能。

## 功能特点

- 🌤 天气预警查询（基于美国国家气象局 API）
- 🔍 天气预报查询
- 💾 数据缓存机制
- ⚡️ 高性能 Express 服务器
- 📝 TypeScript 类型安全
- 🔄 自动热重载（开发模式）

## API 端点

### 1. 获取天气预警
```bash
GET /tools/get-alerts/:state
```
参数：
- `state`: 两字母州代码（如 CA、NY）

示例请求：
```bash
curl http://localhost:3002/tools/get-alerts/CA
```

示例响应：
```json
[
    {
        "event": "Flood Warning",
        "area": "Northern California",
        "severity": "Moderate",
        "description": "Flooding caused by excessive rainfall continues...",
        "instruction": "Turn around, don't drown when encountering flooded roads..."
    }
]
```

### 2. 获取天气预报
```bash
GET /tools/get-forecast?lat={latitude}&lon={longitude}
```
参数：
- `lat`: 纬度
- `lon`: 经度

示例请求：
```bash
curl "http://localhost:3002/tools/get-forecast?lat=37.7749&lon=-122.4194"
```

示例响应：
```json
[
    {
        "period": "Today",
        "temperature": 65,
        "temperatureUnit": "F",
        "windSpeed": "10 mph",
        "windDirection": "NW",
        "description": "Partly cloudy with a high near 65°F"
    }
]
```

### 3. 健康检查
```bash
GET /health
```

示例响应：
```json
{
    "status": "ok",
    "timestamp": "2024-03-23T08:00:00Z"
}
```

## 项目结构

```
weather/
├── config/         # 配置文件
│   └── config.ts   # 服务配置
├── controllers/    # 控制器
│   └── WeatherController.ts
├── models/        # 数据模型
│   └── WeatherTypes.ts
├── services/      # 服务层
│   └── WeatherService.ts
└── index.ts       # 主入口文件
```

## 配置说明

配置文件位于 `config/config.ts`，支持以下环境变量：

- `WEATHER_PORT`: 服务器端口（默认：3002）
- `WEATHER_HOST`: 服务器主机（默认：localhost）

## 开发指南

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run weather
```

服务器将在 http://localhost:3002 启动，支持热重载。

## 缓存机制

- 天气数据缓存时间：30分钟
- 使用内存缓存，重启服务器后缓存会清空
- 可在 `config.ts` 中调整缓存时间

## 错误处理

服务会返回以下错误码：

- 400: 请求参数错误（无效的州代码或坐标）
- 500: 服务器内部错误（API 调用失败等）

错误响应格式：
```json
{
    "error": "错误描述信息"
}
```

## 技术栈

- Express.js - Web 框架
- TypeScript - 编程语言
- Axios - HTTP 客户端
- ts-node-dev - 开发环境工具

## MCP 集成

本服务遵循 MCP (Model Context Protocol) 规范，可以与支持 MCP 的客户端（如 Claude for Desktop）集成。

### Claude for Desktop 配置

在 `claude_desktop_config.json` 中添加：
```json
{
    "mcpServers": {
        "weather": {
            "command": "npm",
            "args": [
                "run",
                "weather"
            ],
            "cwd": "/Users/xugf/webser/mcp-servers"
        }
    }
}
```

## 待实现功能

- [ ] 支持更多天气数据源
- [ ] 添加地理编码功能
- [ ] 支持国际天气查询
- [ ] 添加天气预警推送
- [ ] 实现数据持久化
- [ ] 添加用户认证
- [ ] 添加请求限流
- [ ] 完善单元测试
- [ ] 添加性能监控
- [ ] 支持 Docker 部署

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m '添加一些特性'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT 