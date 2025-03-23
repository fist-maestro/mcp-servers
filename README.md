# MCP Servers

这是一个基于 Node.js 和 TypeScript 的服务器项目，提供了一个可扩展的服务器框架。

## 功能特点

- 🚀 基于 Express.js 的 Web 服务器
- 📝 TypeScript 支持，提供类型安全
- 🔄 开发环境热重载
- 🎯 ESLint 代码规范检查
- ✅ Jest 测试框架支持
- 📦 模块化的项目结构

## 项目结构

```
mcp-servers/
├── src/           # 源代码目录
│   ├── index.ts   # 主程序入口
│   └── demo/      # 示例代码目录
├── config/        # 配置文件目录
├── tests/         # 测试文件目录
├── docs/          # 文档目录
└── scripts/       # 脚本文件目录
```

## 开发环境要求

- Node.js >= 16
- npm >= 8

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```
服务器将在 http://localhost:3000 启动

3. 运行示例程序：
```bash
npm run demo
```
示例程序将在 http://localhost:3001 启动

## 可用的 npm 脚本

- `npm run dev` - 启动开发服务器（支持热重载）
- `npm run demo` - 运行示例程序
- `npm start` - 启动生产环境服务器
- `npm run build` - 构建项目
- `npm test` - 运行测试
- `npm run lint` - 运行代码规范检查

## 示例 API

### 主服务器 (端口 3000)
- `GET /` - 返回欢迎信息

### 示例服务器 (端口 3001)
- `GET /` - 返回默认问候语
- `GET /greet/:name` - 返回自定义问候语

示例：
```bash
# 获取默认问候语
curl http://localhost:3001/

# 获取自定义问候语
curl http://localhost:3001/greet/张三
```

## 技术栈

- Express.js - Web 框架
- TypeScript - 编程语言
- ts-node-dev - 开发环境工具
- ESLint - 代码规范检查
- Jest - 测试框架

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m '添加一些特性'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT 