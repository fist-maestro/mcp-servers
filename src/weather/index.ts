#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { config } from './config/index.js';
import { WeatherController } from './controllers/weather.js';

// Create server instance
const server = new McpServer({
  name: config.server.name,
  version: config.server.version,
  capabilities: {
    resources: {},
    tools: {},
  },
});

const weatherController = new WeatherController();

// Register weather tools
server.tool(
  "get-current-weather",
  "Get current weather for a location",
  {
    city: z.string().describe("City name (e.g. Beijing, London)"),
    country: z.string().optional().describe("Country code (e.g. CN, GB)")
  },
  async ({ city, country }) => {
    const weatherText = await weatherController.getCurrentWeather(city, country);
    return {
      content: [
        {
          type: "text",
          text: weatherText,
        },
      ],
    };
  }
);

server.tool(
  "get-forecast",
  "Get 5-day weather forecast for a location",
  {
    city: z.string().describe("City name (e.g. Beijing, London)"),
    country: z.string().optional().describe("Country code (e.g. CN, GB)")
  },
  async ({ city, country }) => {
    const forecastText = await weatherController.getForecast(city, country);
    return {
      content: [
        {
          type: "text",
          text: forecastText,
        },
      ],
    };
  }
);

async function main() {
  console.error("正在初始化 Weather MCP 服务...");
  console.error(`服务名称: ${config.server.name}`);
  console.error(`服务版本: ${config.server.version}`);
  console.error(`API Base URL: ${config.openWeather.apiBase}`);
  console.error(`单位系统: ${config.openWeather.units}`);
  
  try {
    console.error("正在创建服务传输层...");
    const transport = new StdioServerTransport();
    
    console.error("正在连接 MCP 服务器...");
    await server.connect(transport);
    
    console.error("服务初始化完成！");
    console.error("Weather MCP Server running on stdio");
  } catch (error) {
    console.error("服务启动失败:", error);
    throw error;
  }
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});