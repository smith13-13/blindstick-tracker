@echo off
title Blindman Stick Tracker

echo Blindman Stick Tracker - Setup and Run Script
echo =============================================

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/ (includes npm)
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Starting the server...
echo The dashboard will be available at http://localhost:3000
echo The login page is at http://localhost:3000/login
echo Default credentials: username "caregiver", password "password"
echo Press Ctrl+C to stop the server
echo.

node backend-server.js