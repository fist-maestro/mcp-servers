# MCP Servers

这是一个基于 Node.js 和 TypeScript 的服务器项目，提供了一个简单的入门教程示例。

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
│   └── demo/      # 入门示例代码
│       ├── HelloWorld.ts    # Hello World 类
│       └── index.ts         # 服务器入口
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
服务器将在 http://localhost:3001 启动

## 示例 API

这个示例项目提供了两个简单的 API 端点：

1. 获取默认问候语：
```bash
curl http://localhost:3001/
```
返回：`{"message": "Hello, World!"}`

2. 获取自定义问候语：
```bash
curl http://localhost:3001/greet/你的名字
```
返回：`{"message": "Hello, 你的名字!"}`

## 项目说明

这个项目作为一个入门教程示例，展示了：

1. TypeScript 类的基本使用
   - 属性定义
   - 构造函数
   - 公共和私有方法

2. Express.js 的基本使用
   - 路由设置
   - 请求处理
   - 响应返回

3. 项目最佳实践
   - 配置管理
   - 单元测试
   - API 文档
   - 部署脚本

## 可用的 npm 脚本

- `npm run dev` - 启动开发服务器（支持热重载）
- `npm start` - 启动生产环境服务器
- `npm run build` - 构建项目
- `npm test` - 运行测试
- `npm run lint` - 运行代码规范检查

## 学习资源

- [Express.js 官方文档](https://expressjs.com/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Jest 测试框架文档](https://jestjs.io/)

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m '添加一些特性'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT 