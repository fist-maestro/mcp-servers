export default {
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },
    demo: {
        port: 3001,
        host: 'localhost'
    },
    logger: {
        level: process.env.LOG_LEVEL || 'info'
    }
}; 