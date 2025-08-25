// Run this script with: node cleanup-old-records.js
// It will remove all Location and Alert records without a blindStickNumber field

const mongoose = require('mongoose');
const Location = require('./models/Location');
const Alert = require('./models/Alert');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blindman-stick';

async function cleanup() {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const locResult = await Location.deleteMany({ blindStickNumber: { $exists: false } });
    const alertResult = await Alert.deleteMany({ blindStickNumber: { $exists: false } });

    console.log(`Deleted ${locResult.deletedCount} old location records.`);
    console.log(`Deleted ${alertResult.deletedCount} old alert records.`);

    await mongoose.disconnect();
    console.log('Cleanup complete.');
}

cleanup().catch(err => {
    console.error('Cleanup failed:', err);
    process.exit(1);
});