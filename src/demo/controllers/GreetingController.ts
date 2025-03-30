import { GreetingService } from '../service/GreetingService';
import { GreetingResponse, GreetingRequest, ERROR_MESSAGES } from '../config/constants';

export class GreetingController {
    private greetingService: GreetingService;

    constructor() {
        this.greetingService = new GreetingService();
    }

    /**
     * 处理默认问候请求
     * @returns 问候响应
     */
    public handleDefaultGreeting(): GreetingResponse {
        try {
            const message = this.greetingService.generateGreeting();
            return { message };
        } catch (error) {
            console.error('Error in handleDefaultGreeting:', error);
            throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
        }
    }

    /**
     * 处理自定义问候请求
     * @param request 问候请求参数
     * @returns 问候响应
     */
    public handleCustomGreeting(request: GreetingRequest): GreetingResponse {
        try {
            const message = this.greetingService.generateGreeting(request.name);
            return { message };
        } catch (error) {
            console.error('Error in handleCustomGreeting:', error);
            throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
        }
    }

    /**
     * 处理模板问候请求
     * @param template 问候语模板
     * @param request 问候请求参数
     * @returns 问候响应
     */
    public handleTemplateGreeting(template: string, request: GreetingRequest): GreetingResponse {
        try {
            const message = this.greetingService.generateCustomGreeting(template, request.name);
            return { message };
        } catch (error) {
            console.error('Error in handleTemplateGreeting:', error);
            throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
        }
    }
} 