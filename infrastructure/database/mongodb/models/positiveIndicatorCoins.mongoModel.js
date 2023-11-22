'use strict';

const positiveIndicatorCoins = require('../schemas/positiveIndicatorCoins.schema');
const mongoose = require('mongoose');

function getModel () {
    const collection = `positiveIndicatorCoins`;
    const model = mongoose.model(collection, positiveIndicatorCoins);
    return model;
}

module.exports = getModel;
