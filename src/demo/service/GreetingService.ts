import { DEFAULT_GREETING, ERROR_MESSAGES } from '../config/constants';

export class GreetingService {
    /**
     * 生成问候语
     * @param name 用户名称
     * @returns 格式化的问候语
     */
    public generateGreeting(name?: string): string {
        if (name && name.trim() === '') {
            throw new Error(ERROR_MESSAGES.INVALID_NAME);
        }

        const targetName = name?.trim() || DEFAULT_GREETING;
        return `Hello, ${targetName}!`;
    }

    /**
     * 生成自定义问候语
     * @param template 问候语模板
     * @param name 用户名称
     * @returns 格式化的问候语
     */
    public generateCustomGreeting(template: string, name?: string): string {
        if (!template) {
            return this.generateGreeting(name);
        }

        const targetName = name?.trim() || DEFAULT_GREETING;
        return template.replace('{name}', targetName);
    }
} 