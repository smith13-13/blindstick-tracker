require('dotenv').config();
const express = require('express');
const winston = require('winston');
const Location = require('./models/Location');
const Alert = require('./models/Alert');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const User = require('./models/User');

const cors = require('cors');


const app = express();
// Serve static files from the project directory
app.use(express.static(__dirname));
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

// Enable CORS for all origins and credentials
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [new winston.transports.Console()]
});

const MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => {
        logger.error('MongoDB connection error:', err);
        process.exit(1);
    });

// JWT authentication middleware for REST endpoints
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET || 'demo-secret', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Registration endpoint
app.post('/api/register', async(req, res) => {
    const { username, password, blindStickNumber } = req.body;
    if (!username || !password || !blindStickNumber) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(409).json({ error: 'Username already exists.' });
        const existingStick = await User.findOne({ blindStickNumber });
        if (existingStick) return res.status(409).json({ error: 'Blind stick number already registered.' });
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hash, blindStickNumber });
        await user.save();
        res.json({ message: 'Registration successful.' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed.' });
    }
});

// Login endpoint
app.post('/api/login', async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials.' });
        // Issue JWT
        const token = jwt.sign({ username, blindStickNumber: user.blindStickNumber }, process.env.JWT_SECRET || 'demo-secret', { expiresIn: '1d' });
        res.json({ token, blindStickNumber: user.blindStickNumber });
    } catch (err) {
        res.status(500).json({ error: 'Login failed.' });
    }
});

// Socket.IO authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) return next(new Error('No token provided'));
    jwt.verify(token, process.env.JWT_SECRET || 'demo-secret', (err, user) => {
        if (err) return next(new Error('Invalid token'));
        socket.user = user;
        next();
    });
});

io.on('connection', async(socket) => {
    // Only send data for this caregiver's stick
    try {
        const stickNumber = socket.user.blindStickNumber;
        const locations = await Location.find({ blindStickNumber: stickNumber }).sort({ timestamp: 1 }).limit(100);
        const alerts = await Alert.find({ blindStickNumber: stickNumber }).sort({ timestamp: 1 }).limit(100);
        socket.emit('initialData', { locations, alerts });
    } catch (err) {
        logger.error('Error sending initial data:', err);
    }

    // Receive new location from device/app
    socket.on('newLocation', async(data) => {
        try {
            // Attach stick number to location
            data.blindStickNumber = socket.user.blindStickNumber;
            const loc = new Location(data);
            await loc.save();
            io.emit('locationUpdate', loc);
        } catch (err) {
            logger.error('Error saving location:', err);
        }
    });

    // Receive new alert
    socket.on('newAlert', async(alert) => {
        try {
            // Attach stick number to alert
            alert.blindStickNumber = socket.user.blindStickNumber;
            const a = new Alert(alert);
            await a.save();
            io.emit('alert', a);
        } catch (err) {
            logger.error('Error saving alert:', err);
        }
    });

    // Receive voice instruction from dashboard and send to mobile
    socket.on('voiceInstruction', (msg) => {
        logger.info(`[SOCKET] voiceInstruction received: ${JSON.stringify(msg)}`);
        socket.broadcast.emit('voiceInstruction', msg);
        logger.info(`[SOCKET] voiceInstruction broadcasted.`);
    });

    // Receive reply from mobile and send to dashboard
    socket.on('blindReply', (reply) => {
        logger.info(`[SOCKET] blindReply received: ${JSON.stringify(reply)}`);
        socket.broadcast.emit('blindReply', reply);
        logger.info(`[SOCKET] blindReply broadcasted.`);
    });
});

// Example protected REST endpoint (get location history)
app.get('/api/location-history', authenticateToken, async(req, res) => {
    try {
        // Only return locations for this caregiver's stick
        const stickNumber = req.user.blindStickNumber;
        const locations = await Location.find({ blindStickNumber: stickNumber }).sort({ timestamp: -1 }).limit(100);
        res.json(locations);
    } catch (err) {
        logger.error('Error fetching location history:', err);
        res.status(500).json({ error: 'Failed to fetch location history' });
    }
});

// Example protected REST endpoint (get alert history)
app.get('/api/alerts', authenticateToken, async(req, res) => {
    try {
        // Only return alerts for this caregiver's stick
        const stickNumber = req.user.blindStickNumber;
        const alerts = await Alert.find({ blindStickNumber: stickNumber }).sort({ timestamp: -1 }).limit(100);
        res.json(alerts);
    } catch (err) {
        logger.error('Error fetching alerts:', err);
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => logger.info(`Backend running on port ${PORT}`));