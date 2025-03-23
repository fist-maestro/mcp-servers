#!/bin/bash

# 构建应用
echo "Building application..."
npm run build

# 运行测试
echo "Running tests..."
npm test

# 如果测试通过，启动应用
if [ $? -eq 0 ]; then
    echo "Tests passed. Starting application..."
    npm start
else
    echo "Tests failed. Deployment aborted."
    exit 1
fi 