#!/bin/bash

# FridgeForge Frontend Setup Script
# This script installs all dependencies and sets up the project

echo "🍳 FridgeForge Frontend Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Check if expo is installed globally
if ! command -v expo &> /dev/null; then
    echo "📥 Installing Expo CLI globally..."
    npm install -g expo-cli
fi

echo "✅ Expo CLI installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please update API_URL if needed."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "================================"
echo "✨ Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Run: npm start"
echo "2. Press 'w' for web, 'i' for iOS, 'a' for Android"
echo ""
echo "For more information, see SETUP.md"
