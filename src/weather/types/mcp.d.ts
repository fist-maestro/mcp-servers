declare module '@mintlify/mcp' {
    export class FastMCP {
        constructor(name: string);
        
        tool(options: {
            name: string;
            description: string;
            parameters?: Record<string, {
                type: string;
                description: string;
            }>;
            execute: (...args: any[]) => Promise<any>;
        }): void;

        run(options: {
            transport: 'stdio';
        }): void;
    }
} 