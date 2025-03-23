export class HelloWorld {
    private message: string;

    constructor(message: string = 'Hello, World!') {
        this.message = message;
    }

    public sayHello(): void {
        console.log(this.message);
    }

    public getGreeting(): string {
        return this.message;
    }

    public setGreeting(message: string): void {
        this.message = message;
    }
} 