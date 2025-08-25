# Blindman Stick Tracking Dashboard - Test Plan

## Overview
This document outlines the test plan for verifying the functionality of the blindman stick tracking dashboard, including real-time location tracking and alert notifications.

## Test Environment
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection for loading external resources (Bootstrap, Leaflet.js)
- Console access for viewing logs

## Test Cases

### 1. Real-time Location Tracking
**Objective:** Verify that the map updates with new location data periodically

**Steps:**
1. Open `index.html` in a web browser
2. Observe the initial map display with marker at coordinates (-1.9441, 30.0619)
3. Wait for 5 seconds
4. Verify that the map marker has moved to a new location
5. Verify that the "Last Updated" timestamp in the footer has been updated

**Expected Results:**
- Map marker should move to a new location every 5 seconds
- Footer timestamp should update with each location change

### 2. Alert Notifications
**Objective:** Verify that alert notifications are displayed when received

**Steps:**
1. Open `index.html` in a web browser
2. Wait for approximately 15-30 seconds
3. Observe the browser console for "Alert received" messages
4. Verify that a notification appears in the top-right corner of the screen
5. Verify that the alert panel updates with new alert information
6. Verify that the alert status changes from "OK" to "ALERT"

**Expected Results:**
- Alert notifications should appear every 15-30 seconds
- Visual notification should appear in top-right corner
- Alert panel should update with new alert details
- Alert status should change to "ALERT" with red coloring

### 3. Alert Panel Functionality
**Objective:** Verify that the alert panel displays and manages alerts correctly

**Steps:**
1. Open `index.html` in a web browser
2. Wait for alerts to be received
3. Verify that the "Last Alert" section updates with alert details
4. Verify that new alerts appear in the "Active Alerts" list
5. Verify that alerts are added to the top of the list (most recent first)
6. Click the "View on Map" button in an alert
7. Verify that the map centers on the alert location

**Expected Results:**
- Last Alert section should show details of most recent alert
- Active Alerts list should show all recent alerts
- Map should center on alert location when "View on Map" is clicked

### 4. Connection Status
**Objective:** Verify that connection status is displayed correctly

**Steps:**
1. Open `index.html` in a web browser
2. Observe the connection status indicator in the footer
3. Verify that it shows "Online" with a green indicator
4. Check browser console for WebSocket connection messages

**Expected Results:**
- Connection status should show "Online" with green indicator
- Console should show "Connecting to WebSocket..." and "Connected to WebSocket" messages

### 5. Responsive Design
**Objective:** Verify that the dashboard is responsive on different screen sizes

**Steps:**
1. Open `index.html` in a web browser
2. Resize the browser window to different sizes
3. Verify that the layout adjusts appropriately
4. Verify that all elements remain visible and functional

**Expected Results:**
- Layout should adjust for different screen sizes
- On small screens, sidebar should stack below the map
- All elements should remain visible and functional

## Manual Testing Instructions

### Running the Tests
1. Open `index.html` in a web browser
2. Open browser developer tools (F12) to view console logs
3. Observe the dashboard behavior for several minutes
4. Verify that all test cases pass

### Test Data
The dashboard uses simulated data:
- Location updates occur every 5 seconds with random movements
- Alerts are simulated every 15-30 seconds
- All data is generated client-side for testing purposes

## Automated Testing Considerations
For future development, consider implementing:
- Unit tests for JavaScript functions
- Integration tests for WebSocket connections
- End-to-end tests with tools like Cypress or Selenium

## Success Criteria
All test cases should pass with no critical or high-severity issues.
Minor visual issues may be acceptable for this prototype.