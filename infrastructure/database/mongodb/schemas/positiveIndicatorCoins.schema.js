'use strict';

const mongoose = require('mongoose');
const { indicatorType } = require('../../../../enums');

const positiveIndicatorCoins = new mongoose.Schema({
    exchange: String,
    date: { type: Date, default: Date.now },
    coinName: String,
    indicatorsResults: Object
});

module.exports = positiveIndicatorCoins;
