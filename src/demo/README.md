# Demo 服务

这是一个示例 MCP 服务，用于展示服务的基本结构和开发方法。

## 配置文件说明

### package.json

```json
{
  "name": "@mcp-servers/demo",     // 服务名称，使用 workspace 格式
  "version": "1.0.0",             // 版本号
  "description": "...",           // 服务描述
  "main": "index.ts",            // 入口文件
  "scripts": {
    "build": "tsc",              // 编译 TypeScript 代码
    "start": "node ...",         // 启动服务
    "test": "jest"               // 运行测试
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"  // MCP 协议支持
  },
  "devDependencies": {
    "@types/node": "^20.11.28",  // Node.js 类型定义
    "typescript": "^5.4.2"       // TypeScript 支持
  }
}
```

主要配置说明：
- 使用 workspace 格式的包名便于管理
- 包含必要的 MCP 依赖
- 提供基本的开发脚本命令

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",          // 编译目标版本
    "module": "commonjs",        // 模块系统
    "outDir": "../../build/demo", // 编译输出目录
    "rootDir": "./",            // 源码根目录
    "strict": true,             // 启用严格模式
    "esModuleInterop": true,    // 启用 ES 模块互操作
    "skipLibCheck": true,       // 跳过库文件检查
    "forceConsistentCasingInFileNames": true // 强制文件名大小写一致
  },
  "include": ["./**/*"],        // 包含的文件
  "exclude": [                  // 排除的文件
    "node_modules",
    "**/*.test.ts"
  ]
}
```

主要配置说明：
- 使用现代 JavaScript 特性
- 严格的类型检查
- 清晰的编译输出路径
- 合理的文件包含/排除规则 