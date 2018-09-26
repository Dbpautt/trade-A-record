'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const Record = require('../../models/record');
const records = require('../../data/records');
const users = require('../../data/users');
const User = require('../../models/user');
const Trade = require('../../models/trade');
const trades = require('../../data/trades');

function updateRecordRequested (record, trade, index) {
  return Trade.findOne({ recordRequested: record })
    .then((record) => {
      if (!record) {
        throw new Error('Unknown record requested ' + record);
      }
      trade.recordRequested[index] = record._id;
    });
}

function updateRecordId (trade) {
  const promisesOfUpdatingRecordId = trade.recordRequested.map((record, index) => updateRecordRequested(record, trade, index));
  return Promise.all(promisesOfUpdatingRecordId);
}

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    return Trade.remove({});
  })
  .then(() => {
    const promisesOfUpdatingRecordId = trades.map((trade) => updateRecordId(trade));
    return Promise.all(promisesOfUpdatingRecordId);
  })
  .then(() => {
    return Trade.insertMany(trades);
  })
  .then((result) => {
    console.log('successfully added to database', result);
    mongoose.connection.close();
  })

  .catch((error) => {
    console.log('there has been an error', error);
  });
