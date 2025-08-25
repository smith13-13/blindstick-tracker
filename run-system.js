#!/usr/bin/env node

// Script to set up and run the Blindman Stick Tracker system
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Blindman Stick Tracker - Setup and Run Script');
console.log('=============================================');

// Check if Node.js is installed
try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' });
    console.log(`✓ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
    console.error('✗ Node.js is not installed or not in PATH');
    console.log('Please install Node.js from https://nodejs.org/');
    process.exit(1);
}

// Check if npm is installed
try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' });
    console.log(`✓ npm version: ${npmVersion.trim()}`);
} catch (error) {
    console.error('✗ npm is not installed or not in PATH');
    console.log('Please install Node.js from https://nodejs.org/ (includes npm)');
    process.exit(1);
}

// Check if package.json exists
if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
    console.error('✗ package.json not found');
    console.log('Please run this script from the project directory');
    process.exit(1);
}

console.log('\nInstalling dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✓ Dependencies installed successfully');
} catch (error) {
    console.error('✗ Failed to install dependencies');
    process.exit(1);
}

console.log('\nStarting the server...');
console.log('The dashboard will be available at http://localhost:3000');
console.log('The login page is at http://localhost:3000/login');
console.log('Default credentials: username "caregiver", password "password"');
console.log('Press Ctrl+C to stop the server\n');

try {
    execSync('node backend-server.js', { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to start the server');
    process.exit(1);
}