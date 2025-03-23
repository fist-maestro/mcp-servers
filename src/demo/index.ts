import express from 'express';
import { HelloWorld } from './HelloWorld';

const app = express();
const port = 3001; // 使用不同的端口，避免与主程序冲突

// 创建 HelloWorld 实例
const helloWorld = new HelloWorld();

// 基础路由
app.get('/', (req, res) => {
    res.json({ message: helloWorld.getGreeting() });
});

// 自定义问候语路由
app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    helloWorld.setGreeting(`Hello, ${name}!`);
    res.json({ message: helloWorld.getGreeting() });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Demo server is running at http://localhost:${port}`);
    console.log('Try these endpoints:');
    console.log(`- http://localhost:${port}/`);
    console.log(`- http://localhost:${port}/greet/YourName`);
}); 