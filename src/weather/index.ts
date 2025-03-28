/// <reference path="../types/mcp.d.ts" />
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { WeatherService } from './services/WeatherService';

const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";

async function startServer() {
    const weatherService = new WeatherService();
    
    // 创建服务器实例
    const server = new McpServer({
        name: "weather",
        version: "1.0.0"
    });

    // 注册天气预警工具
    server.tool(
        "get-alerts",
        "获取指定州的天气预警信息",
        {
            state: z.string().length(2).describe('两字母州代码（如 CA、NY）')
        },
        async ({ state }) => {
            const alerts = await weatherService.getAlerts(state);
            return {
                content: [
                    {
                        type: "text",
                        text: alerts
                    }
                ]
            };
        }
    );

    // 注册天气预报工具
    server.tool(
        "get-forecast",
        "获取指定位置的天气预报",
        {
            latitude: z.number().describe('纬度'),
            longitude: z.number().describe('经度')
        },
        async ({ latitude, longitude }) => {
            const forecast = await weatherService.getForecast({ latitude, longitude });
            return {
                content: [
                    {
                        type: "text",
                        text: forecast
                    }
                ]
            };
        }
    );

    // 健康检查工具
    server.tool(
        "health",
        "检查服务器状态",
        {},
        async () => {
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            status: 'ok',
                            timestamp: new Date().toISOString()
                        })
                    }
                ]
            };
        }
    );

    return server;
}

// 启动服务器
async function main() {
    console.log('正在启动 MCP Weather 服务...');
    console.log('可用的工具：');
    console.log('- get-alerts - 获取州的天气预警');
    console.log('- get-forecast - 获取位置天气预报');
    console.log('- health - 检查服务状态');

    try {
        const server = await startServer();
        console.log('服务器实例创建成功');
        
        const transport = new StdioServerTransport();
        console.log('传输层实例创建成功');
        
        // 添加更多调试信息
        console.log('正在连接传输层...');
        await server.connect(transport);
        console.log('传输层连接成功');
        console.log('Weather MCP Server 已启动，运行在 stdio 上');
        console.log('服务器配置:', {
            name: "weather",
            version: "1.0.0",
            toolsCount: 3
        });

        // 添加进程事件监听
        process.on('exit', () => {
            console.log('服务正在关闭...');
        });

        process.on('SIGINT', () => {
            console.log('收到中断信号，正在优雅关闭...');
            process.exit(0);
        });

        // 添加简单的心跳检查
        setInterval(() => {
            console.log('服务器运行正常 -', new Date().toISOString());
        }, 60000); // 每分钟打印一次

    } catch (error) {
        console.error('启动服务器时发生错误:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error('Fatal error in main():', error);
        process.exit(1);
    });
} 