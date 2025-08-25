# Copilot Instructions for Blindman Stick Tracker

## Project Overview
This project is a real-time GPS tracking and alert system for a smart walking stick used by blind individuals. It consists of:
- **Mobile App** (`mobile-prototype.html`): Runs on a smartphone, sends GPS and SOS alerts to the backend.
- **Backend Server** (`backend-server.js`): Node.js + Socket.IO server for real-time data, authentication, and storage.
- **Dashboard** (`index.html`): Web UI for caregivers, shows live map, alerts, and history. Protected by login (`login.html`).

## Architecture & Data Flow
- The mobile app sends location and alert data to the backend via WebSocket and REST API.
- The backend broadcasts updates to all connected dashboards in real time.
- The dashboard displays the latest location, alerts, and history, and updates live via WebSocket events.
- Authentication is JWT-based for caregivers; tokens are stored in `localStorage`.

## Key Files & Patterns
- `backend-server.js`: Express + Socket.IO server. Handles `/api/location`, `/api/alert`, `/api/login`, and WebSocket events (`locationUpdate`, `alert`, `initialData`).
- `index.html`: Uses Leaflet.js for maps, Bootstrap for UI, and connects to backend via Socket.IO. Handles real-time updates and displays status.
- `mobile-prototype.html`: Uses Geolocation API and Socket.IO to send data. SOS button triggers alert event.
- `login.html`: Simple login form, posts to `/api/login`, stores JWT in `localStorage`.

## Developer Workflows
- **Start backend:** `node backend-server.js` (after `npm install`)
- **Test dashboard:** Open `login.html` → login → redirected to `index.html`
- **Test mobile:** Open `mobile-prototype.html` on a phone, allow location, press SOS to trigger alert
- **All components must use the same backend URL/IP**

## Conventions & Integration
- All real-time data uses Socket.IO events; REST is used for login and backup data submission.
- Location and alert data are JSON objects with `latitude`, `longitude`, `timestamp`.
- UI is Bootstrap-based, map is Leaflet.js, no build step required (pure HTML/JS/CSS).
- Error handling: Show user-friendly messages for network/auth failures.
- Responsive and accessible UI per `dashboard-ui-design.md`.

## Testing & Debugging
- Manual testing: Open dashboard and mobile app, observe real-time updates.
- Simulated data: Mobile app can be run in browser for testing.
- See `test-plan.md` for test cases and manual test steps.

## Security & Deployment
- Use HTTPS in production for all endpoints.
- JWT tokens for authentication; store in `localStorage`.
- See `architecture.md` and `mobile-app-plan.md` for security and deployment notes.

## Examples
- To add a new alert type, emit a new event from mobile and handle it in both backend and dashboard.
- To change backend address, update all Socket.IO and fetch URLs in HTML files.

---
For more details, see `README.md`, `USAGE.md`, `architecture.md`, and `dashboard-ui-design.md`.
