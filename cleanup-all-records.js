// Run this script with: node cleanup-all-records.js
// It will delete ALL Location and Alert records for a full reset

const mongoose = require('mongoose');
const Location = require('./models/Location');
const Alert = require('./models/Alert');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blindman-stick';

async function cleanupAll() {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const locResult = await Location.deleteMany({});
    const alertResult = await Alert.deleteMany({});

    console.log(`Deleted ${locResult.deletedCount} location records.`);
    console.log(`Deleted ${alertResult.deletedCount} alert records.`);

    await mongoose.disconnect();
    console.log('Full reset complete.');
}

cleanupAll().catch(err => {
    console.error('Cleanup failed:', err);
    process.exit(1);
});