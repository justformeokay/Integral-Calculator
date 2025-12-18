#!/bin/bash

# Quick Start Script untuk Frontend React

echo "🚀 Starting Integral Calculator Frontend Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak terinstall. Silakan install Node.js terlebih dahulu."
    echo "Download dari: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/frontend" || exit 1

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Untuk menjalankan aplikasi, gunakan:"
echo "  npm start"
echo ""
echo "Server akan berjalan di: http://localhost:3000"
echo ""
