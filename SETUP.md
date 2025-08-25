# Setup Instructions for Blindman Stick Tracker

## Prerequisites

Before running the Blindman Stick Tracker application, you need to install the following software:

1. **Node.js** (version 14 or higher)
   - Download from: https://nodejs.org/
   - This will also install npm (Node Package Manager)

## Installation Steps

1. **Install Node.js**
   - Visit https://nodejs.org/ and download the LTS version
   - Run the installer and follow the installation wizard
   - Verify installation by opening a command prompt and running:
     ```
     node --version
     npm --version
     ```

2. **Install Project Dependencies**
   - Open a command prompt in the project directory
   - Run the following command to install all required dependencies:
     ```
     npm install
     ```
   - This will install Express, Socket.IO, bcrypt, and jsonwebtoken

3. **Start the Server**
   - Run the following command to start the server:
     ```
     npm start
     ```
   - Or for development with auto-restart:
     ```
     npm run dev
     ```

4. **Access the Application**
   - Open a web browser and navigate to:
     - Login page: http://localhost:3000/login
     - Default username: caregiver
     - Default password: password

## Troubleshooting

### 'npm' is not recognized as an internal or external command

This error indicates that Node.js and npm are not installed or not in your system's PATH.

Solution:
1. Download and install Node.js from https://nodejs.org/
2. Restart your command prompt
3. Verify installation with `node --version` and `npm --version`

### 'node' is not recognized as an internal or external command

This error also indicates that Node.js is not installed or not in your system's PATH.

Solution:
1. Download and install Node.js from https://nodejs.org/
2. Restart your command prompt
3. Verify installation with `node --version`

### EACCES permission error

This error occurs on Linux/Mac when npm doesn't have permission to write to the default directory.

Solution:
1. Use nvm (Node Version Manager) to manage Node.js installations
2. Or configure npm to use a different directory:
   ```
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   ```
   Then add `export PATH=~/.npm-global/bin:$PATH` to your profile file (.bashrc, .zshrc, etc.)

### Module not found errors

If you get errors about missing modules (bcrypt, jsonwebtoken, etc.), make sure you've run `npm install`.

## Default User Credentials

The application comes with a default user account for testing:

- Username: `caregiver`
- Password: `password`

## Security Notes

For production use, you should:

1. Change the default password immediately
2. Use environment variables for sensitive configuration (JWT secret, etc.)
3. Implement HTTPS
4. Add account lockout after failed login attempts
5. Implement session timeout for inactive users
6. Use a proper database instead of in-memory storage