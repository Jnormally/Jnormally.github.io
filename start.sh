#!/bin/bash
cd /root/.openclaw/workspace/sculpture-h5
nohup python3 server.py > /tmp/server.log 2>&1 &
echo "服务器已后台启动"
echo "访问: http://localhost:8080"
echo "日志: tail -f /tmp/server.log"
