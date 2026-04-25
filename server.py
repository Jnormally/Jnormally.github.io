#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
君德艺术雕塑 - 简易服务器
支持静态文件服务 + 询价记录API
"""

import http.server
import socketserver
import json
import os
from datetime import datetime
from urllib.parse import unquote

PORT = 8080
INQUIRY_DIR = "inquiries"

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/inquiry':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                name = data.get('name', '').strip()
                phone = data.get('phone', '').strip()
                inquiry_type = data.get('type', '')
                
                # 验证
                if not name or not phone:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': '姓名和电话必填'}).encode())
                    return
                
                # 创建目录
                if not os.path.exists(INQUIRY_DIR):
                    os.makedirs(INQUIRY_DIR)
                
                # 文件名：2026-04-11.csv
                today = datetime.now().strftime('%Y-%m-%d')
                filename = os.path.join(INQUIRY_DIR, f"{today}.csv")
                
                # 写入数据
                now = datetime.now().strftime('%H:%M:%S')
                record = f"{now},{name},{phone},{inquiry_type}\\n"
                
                # 如果文件不存在，写入表头
                if not os.path.exists(filename):
                    with open(filename, 'w', encoding='utf-8-sig') as f:
                        f.write("时间,姓名,电话,询价类型\\n")
                
                # 追加记录
                with open(filename, 'a', encoding='utf-8-sig') as f:
                    f.write(record)
                
                print(f"[询价记录] {today} {name} {phone} {inquiry_type}")
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': True, 'message': '提交成功'}).encode())
                
            except Exception as e:
                print(f"Error: {e}")
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
        print(f"\\n🚀 服务器启动成功！")
        print(f"📁 工作目录: {os.getcwd()}")
        print(f"🌐 访问地址: http://localhost:{PORT}")
        print(f"📝 询价记录保存到: {INQUIRY_DIR}/")
        print(f"\\n按 Ctrl+C 停止服务器\\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\\n\\n👋 服务器已停止")
