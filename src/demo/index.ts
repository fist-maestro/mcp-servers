import { GreetingController } from './controllers/GreetingController';
import { GreetingRequest } from './config/constants';

// 创建控制器实例
const greetingController = new GreetingController();

interface ToolRequest {
    tool: string;
    args: any[];
}

// 注册 MCP 工具
const tools: Record<string, Function> = {
    'get-default-greeting': () => {
        return greetingController.handleDefaultGreeting();
    },
    'get-custom-greeting': (request: GreetingRequest) => {
        return greetingController.handleCustomGreeting(request);
    },
    'get-template-greeting': (template: string, request: GreetingRequest) => {
        return greetingController.handleTemplateGreeting(template, request);
    }
};

// 处理标准输入
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (data: string) => {
    try {
        const request: ToolRequest = JSON.parse(data);
        const { tool, args } = request;

        if (tool in tools) {
            const result = tools[tool](...(args || []));
            console.log(JSON.stringify({ result }));
        } else {
            console.error(`Unknown tool: ${tool}`);
        }
    } catch (error) {
        console.error('Error processing request:', error);
    }
});

console.log('Demo MCP Server running on stdio.'); 