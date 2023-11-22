const mongodb = require('./infrastructure/database/mongodb');
const { onStartDataHistoricalBot } = require('./application');

async function runApp() {
    await initInfrastructure();
    await onStartDataHistoricalBot();
}

async function initInfrastructure() {
    await mongodb.init();
}

runApp();