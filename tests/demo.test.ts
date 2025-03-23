import { HelloWorld } from '../src/demo/HelloWorld';

describe('HelloWorld', () => {
    let helloWorld: HelloWorld;

    beforeEach(() => {
        helloWorld = new HelloWorld();
    });

    it('should return default greeting', () => {
        expect(helloWorld.getGreeting()).toBe('Hello, World!');
    });

    it('should set and return custom greeting', () => {
        helloWorld.setGreeting('Hello, Test!');
        expect(helloWorld.getGreeting()).toBe('Hello, Test!');
    });
}); 