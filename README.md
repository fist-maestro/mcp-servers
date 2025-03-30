# MCP Servers 项目

基于 Model Context Protocol (MCP) 开发的服务集合，用于支持 Cursor IDE 的智能功能。目前包含示例服务和天气服务。

## 开发环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- TypeScript >= 4.5.0
- Cursor IDE（最新版本）

## 项目结构

```
mcp-servers/
├── src/                    # 源代码目录
│   ├── demo/              # 示例服务
│   │   ├── config/       # 配置层：常量、类型定义
│   │   │   ├── constants.ts    # 常量定义
│   │   │   └── types.ts        # 类型定义
│   │   ├── controllers/  # 控制器层：请求处理
│   │   │   └── GreetingController.ts  # 问候控制器
│   │   ├── service/      # 服务层：业务逻辑
│   │   │   └── GreetingService.ts     # 问候服务
│   │   ├── package.json  # 服务配置文件
│   │   ├── tsconfig.json # TypeScript 配置
│   │   └── index.ts      # 服务入口文件
│   │
│   └── weather/          # 天气服务
│       ├── config/       # 配置层：常量、类型定义
│       │   ├── constants.ts    # 常量定义
│       │   └── types.ts        # 类型定义
│       ├── controllers/  # 控制器层：请求处理
│       │   └── WeatherController.ts  # 天气控制器
│       ├── service/      # 服务层：业务逻辑
│       │   └── WeatherService.ts     # 天气服务
│       ├── package.json  # 服务配置文件
│       ├── tsconfig.json # TypeScript 配置
│       └── index.ts      # 服务入口文件
│
├── build/                  # 编译输出目录
├── node_modules/          # 依赖包
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
└── README.md             # 项目文档
```

## 代码分层架构

项目采用三层架构设计，每个服务都遵循相同的结构模式：

### 1. 配置层（Config）
位置：`服务目录/config/`
- **职责**：
  - 定义常量和配置项
  - 声明类型和接口
  - 管理环境变量
- **主要文件**：
  - `constants.ts`: 常量定义
  - `types.ts`: 类型定义
- **特点**：
  - 集中管理配置
  - 类型安全
  - 易于维护和修改

### 2. 控制器层（Controllers）
位置：`服务目录/controllers/`
- **职责**：
  - 处理 MCP 请求和响应
  - 参数验证和错误处理
  - 调用服务层方法
- **主要文件**：
  - `XXXController.ts`: 具体业务控制器
- **特点**：
  - 请求参数验证
  - 错误处理和日志
  - 响应格式化

### 3. 服务层（Service）
位置：`服务目录/service/`
- **职责**：
  - 实现核心业务逻辑
  - 处理数据转换
  - 调用外部 API
- **主要文件**：
  - `XXXService.ts`: 具体业务服务
- **特点**：
  - 业务逻辑封装
  - 数据处理和转换
  - 外部服务集成

### 服务入口（index.ts）
位置：`服务目录/index.ts`
- **职责**：
  - 初始化服务实例
  - 注册 MCP 工具
  - 处理标准输入输出
- **特点**：
  - 统一的入口点
  - MCP 工具注册
  - 错误处理

## 开发流程

1. **新建服务**
   ```bash
   mkdir -p src/new-service/{config,controllers,service}
   ```

2. **实现各层功能**
   - 配置层：定义常量和类型
   - 控制器层：处理请求和响应
   - 服务层：实现业务逻辑

3. **创建配置文件**
   - `package.json`: 服务依赖和脚本
   - `tsconfig.json`: TypeScript 配置

4. **编写入口文件**
   - 创建 `index.ts`
   - 注册 MCP 工具
   - 实现请求处理

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd mcp-servers
```

### 2. 安装依赖

```bash
npm install
```

### 3. 构建项目

```bash
# 构建所有服务
npm run build

# 构建单个服务
npm run build:weather  # 构建天气服务
npm run build:demo    # 构建示例服务
```

### 4. 配置 MCP

编辑 `~/.cursor/mcp.json` 文件：

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": [
        "/your/path/to/mcp-servers/build/weather/index.js"
      ],
      "env": {
        "OPENWEATHER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### 5. 启动服务

```bash
# 启动天气服务
npm run start:weather

# 启动示例服务
npm run start:demo
```

## 可用服务说明

### 1. 示例服务（Demo）

- 位置：`src/demo/`
- 功能：展示 MCP 服务的基本结构和开发方法
- 特点：
  - 简单的请求响应示例
  - 基础错误处理
  - 代码注释完善，适合学习

### 2. 天气服务（Weather）

- 位置：`src/weather/`
- 功能：提供全球天气查询服务
- 特点：
  - 实时天气查询
  - 5天天气预报
  - 支持多城市查询
  - 详细的天气信息

查看各服务详细文档：
- [天气服务文档](src/weather/readme.md)
- [示例服务文档](src/demo/readme.md)

## 开发指南

### 创建新服务

1. 在 `src` 目录下创建新服务目录
2. 参考现有服务的目录结构
3. 实现必要的控制器和服务
4. 在 `package.json` 添加相应的构建和启动脚本

### 调试方法

1. 使用 `console.error()` 输出调试信息
2. 检查 Cursor IDE 的 MCP 日志
3. 使用 TypeScript 的源码映射功能

### 测试

```bash
# 运行所有测试
npm test

# 运行特定服务的测试
npm run test:weather
```

## 常见问题

1. **服务无法启动**
   - 检查端口占用
   - 确认环境变量配置
   - 验证构建输出

2. **API 调用失败**
   - 检查 API Key 配置
   - 确认网络连接
   - 查看错误日志

3. **Cursor IDE 无法识别服务**
   - 检查 MCP 配置
   - 重启 Cursor IDE
   - 确认服务状态

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License