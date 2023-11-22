'use strict';

const models = require('./models');
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://dorvaknin:qwe1234567@cryptohistoricalbot.26gdq.mongodb.net/historicalDataBot?retryWrites=true&w=majority';
async function init () {
    await initConnection();
    initModels();
}

async function initConnection () {
    console.log('Connecting to MongoDB');
    await mongoose.connect(
        connectionString,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
}

function initModels () {
    for (const [key, init] of Object.entries(models)) {
        models[key] = init();
    }
}

module.exports = {
    init,
    models
};
