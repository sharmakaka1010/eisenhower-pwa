#!/usr/bin/env python3
"""
Lightweight HTTP Server for FocusMatrix PWA
Serves with proper MIME types for PWA manifests, icons, and service workers.
Usage: python server.py [port]
"""

import http.server
import socketserver
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class PWAHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable Service Worker registration and disable aggressive caching for dev testing
        self.send_header('Service-Worker-Allowed', '/')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        # Ensure correct MIME types for PWA assets
        if path.endswith('.webmanifest') or path.endswith('manifest.json'):
            return 'application/manifest+json'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), PWAHTTPRequestHandler) as httpd:
        print("=" * 65)
        print(" 🎯 FocusMatrix Eisenhower Matrix PWA Server")
        print(f" 🌐 Running at: http://localhost:{PORT}")
        print(" 📦 Serving from:", DIRECTORY)
        print("=" * 65)
        print(" To install as a standalone app:")
        print("  - Chrome / Edge (Desktop): Click the 'Install' button in the top bar")
        print("  - Android: Open in Chrome, tap 'Install App' or 'Add to Home screen'")
        print("  - iOS (Safari): Tap Share icon -> 'Add to Home Screen'")
        print(" Press Ctrl+C to terminate.")
        print("=" * 65)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
