declare module "@modelcontextprotocol/sdk/server/mcp.js" {
    export class McpServer {
        constructor(options: {
            name: string;
            version: string;
        });

        tool(
            name: string,
            description: string,
            parameters: any,
            handler: (...args: any[]) => Promise<any>
        ): void;

        connect(transport: any): Promise<void>;
    }
}

declare module "@modelcontextprotocol/sdk/server/stdio.js" {
    export class StdioServerTransport {
        constructor();
    }
} 