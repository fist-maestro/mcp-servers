# Weather MCP Server

一个基于 Model Context Protocol (MCP) 的天气服务，使用 OpenWeather API 提供全球天气信息。

## 功能特点

- 获取全球任何城市的实时天气信息
- 获取5天天气预报
- 支持城市名称和国家代码组合查询
- 提供详细的天气信息，包括：
  - 温度和体感温度（摄氏度）
  - 天气状况描述
  - 湿度
  - 风速
  - 气压

## 项目结构

```
weather/
├── config/         # 配置文件
├── controllers/    # 业务逻辑控制器
├── service/        # 服务层（API 调用）
├── index.ts       # 主入口文件
├── package.json   # 项目配置
├── tsconfig.json  # TypeScript 配置
└── readme.md      # 项目文档
```

## 安装和构建

1. 安装依赖（在项目根目录执行）：
```bash
npm install
```

2. 构建项目：
```bash
npm run build:weather
```

## 配置说明

### 1. OpenWeather API 配置

服务使用 OpenWeather API 获取天气数据。你需要一个有效的 API Key。

### 获取 OpenWeather API Key

1. 访问 OpenWeather 官网：https://openweathermap.org/
2. 点击右上角的 "Sign In" 按钮
3. 选择 "Create an Account" 创建新账户
   - 填写邮箱地址
   - 设置密码
   - 选择免费计划（Free Plan）
4. 完成账户创建后登录
5. 进入 API Keys 页面：
   - 点击右上角用户菜单
   - 选择 "My API Keys"
6. 在 API Keys 页面：
   - 默认会生成一个 API Key
   - 或点击 "Generate" 创建新的 Key
7. 复制生成的 API Key

注意事项：
- 新注册的 API Key 需要等待约 2 小时后才能激活
- 免费计划每分钟限制 60 次调用
- 请妥善保管你的 API Key，不要分享给他人

### 2. MCP 配置

要在 Cursor IDE 中使用此服务，需要配置 MCP。编辑 `~/.cursor/mcp.json` 文件：

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": [
        "/path/to/your/mcp-servers/build/weather/index.js"
      ],
      "env": {
        "OPENWEATHER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

注意：
- 将 `/path/to/your/mcp-servers` 替换为你的实际项目路径
- 可以使用默认的测试 API Key 或替换为你自己的 API Key

## 使用方法

### 在 Cursor IDE 中使用

1. 确保 MCP 配置正确
2. 重启 Cursor IDE 使配置生效
3. 现在你可以通过自然语言查询天气了

示例查询：
- "查询北京的天气"
- "深圳今天的天气怎么样？"
- "查询上海未来5天的天气预报"
- "东京的天气状况如何？"

### API 工具说明

服务提供两个主要工具：

1. `get-current-weather`
   - 功能：获取当前天气
   - 参数：
     - `city`: 城市名称（必填）
     - `country`: 国家代码（可选，如：CN, JP, US）

2. `get-forecast`
   - 功能：获取5天天气预报
   - 参数：
     - `city`: 城市名称（必填）
     - `country`: 国家代码（可选）

## 返回数据说明

### 当前天气数据
```
Current weather in [城市名], [国家代码]:
Temperature: XX°C (Feels like: XX°C)
Conditions: [天气状况] - [详细描述]
Humidity: XX%
Wind Speed: XX m/s
Pressure: XXXX hPa
```

### 天气预报数据
```
5-day forecast for [城市名], [国家代码]:

Date: YYYY-MM-DD
Temperature: XX°C (Feels like: XX°C)
Conditions: [天气状况] - [详细描述]
Humidity: XX%
Wind Speed: XX m/s
---
[后续日期数据...]
```

## 故障排除

如果服务无法正常工作：

1. 检查 MCP 配置是否正确
2. 确保项目已正确构建
3. 检查 API Key 是否有效
4. 重启 Cursor IDE
5. 检查服务日志输出

## 开发说明

### 添加新功能

1. 在 `service` 目录添加新的服务方法
2. 在 `controllers` 目录添加对应的控制器方法
3. 在 `index.ts` 中注册新的 MCP 工具

### 调试方法

1. 使用 console.error() 输出调试信息
2. 检查 Cursor IDE 的 MCP 日志
3. 直接运行服务查看输出：
```bash
npm run start:weather
```

# Weather 服务配置说明

## 配置文件说明

### package.json

```json
{
  "name": "@mcp-servers/weather",  // 服务名称，使用 workspace 格式
  "version": "1.0.0",             // 版本号
  "description": "Weather MCP service for global weather information", // 服务描述
  "main": "index.ts",            // 入口文件
  "scripts": {
    "build": "tsc",              // 编译 TypeScript 代码
    "start": "node ../../build/weather/index.js", // 启动服务
    "test": "jest"               // 运行测试
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0", // MCP 协议支持
    "axios": "^1.6.7"            // HTTP 客户端，用于调用天气 API
  },
  "devDependencies": {
    "@types/node": "^20.11.28",  // Node.js 类型定义
    "typescript": "^5.4.2"       // TypeScript 支持
  }
}
```

主要配置说明：
- 使用 workspace 格式的包名便于管理
- 包含 MCP 和 HTTP 客户端依赖
- 提供服务特定的脚本命令
- 支持环境变量配置（OPENWEATHER_API_KEY）

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",           // 编译目标版本
    "module": "commonjs",         // 模块系统
    "outDir": "../../build/weather", // 编译输出目录
    "rootDir": "./",             // 源码根目录
    "strict": true,              // 启用严格模式
    "esModuleInterop": true,     // 启用 ES 模块互操作
    "skipLibCheck": true,        // 跳过库文件检查
    "forceConsistentCasingInFileNames": true, // 强制文件名大小写一致
    "resolveJsonModule": true    // 支持导入 JSON 文件
  },
  "include": ["./**/*"],         // 包含的文件
  "exclude": [                   // 排除的文件
    "node_modules",
    "**/*.test.ts"
  ]
}
```

主要配置说明：
- 使用现代 JavaScript 特性
- 严格的类型检查
- 支持 JSON 模块导入（用于配置文件）
- 清晰的编译输出路径
- 合理的文件包含/排除规则

## 环境变量

服务依赖的环境变量：
- `OPENWEATHER_API_KEY`: OpenWeather API 密钥
  - 必需
  - 用于访问天气数据
  - 在 MCP 配置中设置 