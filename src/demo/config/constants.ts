// 定义问候语相关的常量和类型

export const DEFAULT_GREETING = 'World';

export interface GreetingResponse {
    message: string;
}

export interface GreetingRequest {
    name?: string;
}

// 错误消息常量
export const ERROR_MESSAGES = {
    INVALID_NAME: 'Name must be a non-empty string',
    INTERNAL_ERROR: 'Internal server error occurred'
}; 