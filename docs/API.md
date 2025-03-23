# API 文档

## 主服务器 API

### 基础端点

#### GET /
返回欢迎信息

**请求**
```bash
curl http://localhost:3000/
```

**响应**
```json
{
    "message": "Welcome to MCP Servers API"
}
```

## Demo 服务器 API

### 问候语端点

#### GET /
返回默认问候语

**请求**
```bash
curl http://localhost:3001/
```

**响应**
```json
{
    "message": "Hello, World!"
}
```

#### GET /greet/:name
返回自定义问候语

**参数**
- `name`: 要问候的名字

**请求**
```bash
curl http://localhost:3001/greet/张三
```

**响应**
```json
{
    "message": "Hello, 张三!"
}
``` 