'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const Record = require('../../models/record');
// const records = require('../../data/records');
// const users = require('../../data/users');
// const User = require('../../models/user');
const Trade = require('../../models/trade');
const trades = require('../../data/trades');

function updateRecordRequested (recordA, trade, index) {
  return Record.findOne({ owner: recordA })
    .then((wantedRecord) => {
      if (!wantedRecord) {
        throw new Error('Unknown wantedRecord ' + recordA);
      }
      trade.owner[index] = wantedRecord._id;
    });
}

function updateRecordRequestedId (trade) {
  const promisesOfUpdatingRecordRequestedId = trade.recordRequested.map((recordA, index) => updateRecordRequested(recordA, trade, index));
  return Promise.all(promisesOfUpdatingRecordRequestedId);
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
    const promisesOfUpdatingRecordRequestedId = trades.map((record) => updateRecordRequestedId(record));
    return Promise.all(promisesOfUpdatingRecordRequestedId);
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
