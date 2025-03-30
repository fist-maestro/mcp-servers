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
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 