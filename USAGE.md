# Blindman Stick Tracker - Usage Guide

## Overview

This guide explains how to use the complete Blindman Stick Tracker system with the caregiver login feature. The system consists of:

1. A mobile app for the blind person (mobile-prototype.html)
2. A backend server (backend-server.js)
3. A dashboard for caregivers with login protection (login.html and index.html)

## Prerequisites

Before using the system, ensure you have:

1. Node.js (version 14 or higher) installed
2. A modern web browser (Chrome, Firefox, Safari, or Edge)
3. A smartphone with GPS capabilities for the mobile app

For detailed setup instructions, see [SETUP.md](SETUP.md).

## System Components

### 1. Mobile App (mobile-prototype.html)
- Runs on the blind person's smartphone
- Uses the smartphone's GPS for location tracking
- Features an SOS button for emergency alerts
- Automatically sends location updates to the backend server

### 2. Backend Server (backend-server.js)
- Handles all data communication between the mobile app and dashboard
- Implements JWT-based authentication for caregivers
- Provides real-time updates via WebSocket
- Stores location history and alerts

### 3. Caregiver Dashboard (index.html)
- Protected by login authentication
- Displays real-time location updates on an interactive map
- Shows alert notifications when the SOS button is pressed
- Provides location history tracking

### 4. Login Page (login.html)
- Secure login interface for caregivers
- Default credentials: username "caregiver", password "password"
- JWT-based authentication

## Running the System

### Method 1: Using the Setup Script (Recommended)

1. Open a terminal/command prompt in the project directory
2. Run the setup script:
   ```
   npm run setup
   ```
3. The script will:
   - Verify Node.js and npm installation
   - Install all required dependencies
   - Start the backend server
   - Display access information

### Method 2: Manual Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   npm run dev
   ```

## Accessing the System

### For Caregivers (Dashboard)

1. Open a web browser and navigate to:
   ```
   http://localhost:3000/login
   ```

2. Log in with the default credentials:
   - Username: `caregiver`
   - Password: `password`

3. After successful login, you'll be redirected to the dashboard at:
   ```
   http://localhost:3000
   ```

4. The dashboard will automatically connect to the backend and display:
   - Real-time location updates on the map
   - Alert notifications when the SOS button is pressed
   - Location history

5. To log out, click the "Logout" button in the top right corner

### For Blind Users (Mobile App)

1. On the blind person's smartphone, open a web browser
2. Navigate to:
   ```
   http://your-server-ip:3000/mobile-prototype.html
   ```
   (Replace `your-server-ip` with the actual IP address of your server)

3. Allow location access when prompted
4. The app will automatically start tracking the location
5. Press the large SOS button to send an alert to the caregiver's dashboard

## Default User Credentials

The system comes with a default user account for testing:

- Username: `caregiver`
- Password: `password`

For production use, change this password immediately.

## API Endpoints

All endpoints (except login) require a valid JWT token in the Authorization header.

- `POST /api/login` - Login endpoint for caregivers
- `POST /api/location` - Send location data from mobile app
- `POST /api/alert` - Send alert from mobile app
- `GET /api/location-history` - Get location history (requires authentication)
- `GET /api/alerts` - Get alert history (requires authentication)

## WebSocket Events

- `locationUpdate` - Real-time location updates
- `alert` - Real-time alert notifications
- `initialData` - Initial data when dashboard connects

## Troubleshooting

### Login Issues

1. **Invalid username or password**
   - Ensure you're using the correct default credentials
   - Check that you're on the login page, not the dashboard

2. **Dashboard redirecting to login**
   - This is normal behavior when not logged in
   - Log in with valid credentials to access the dashboard

### Mobile App Issues

1. **Location not updating**
   - Ensure location services are enabled on the smartphone
   - Check that the browser has permission to access location
   - Verify that the backend server is running and accessible

2. **Alerts not working**
   - Ensure the mobile app can reach the backend server
   - Check that the SOS button is properly configured
   - Verify that the dashboard is connected to the WebSocket

### Dashboard Issues

1. **Map not updating**
   - Check that the backend server is running
   - Verify WebSocket connection in browser developer tools
   - Check the server logs for any errors

2. **No alerts appearing**
   - Ensure the mobile app is sending alerts correctly
   - Check that the dashboard is connected to the WebSocket
   - Verify that the alert panel is visible

## Security Notes

This implementation provides a solid foundation for authentication, but for production use, consider:

1. Using HTTPS in production
2. Implementing rate limiting to prevent abuse
3. Adding input validation for all API endpoints
4. Using environment variables for sensitive configuration (JWT secret, etc.)
5. Implementing stronger password requirements
6. Adding account lockout after failed login attempts
7. Implementing session timeout for inactive users

## Support

For additional help, please refer to:

- [README.md](README.md) - Main project documentation
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [SECURITY.md](SECURITY.md) - Security considerations (if available)

If you encounter any issues not covered in this guide, please check the browser console and server logs for error messages.