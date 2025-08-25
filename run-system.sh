#!/bin/bash

echo "Blindman Stick Tracker - Setup and Run Script"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
echo "Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "Error: npm is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/ (includes npm)"
    exit 1
fi

# Check npm version
echo "npm version: $(npm --version)"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found"
    echo "Please run this script from the project directory"
    exit 1
fi

echo ""
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

echo ""
echo "Starting the server..."
echo "The dashboard will be available at http://localhost:3000"
echo "The login page is at http://localhost:3000/login"
echo "Default credentials: username \"caregiver\", password \"password\""
echo "Press Ctrl+C to stop the server"
echo ""

node backend-server.js