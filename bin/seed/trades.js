'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const Record = require('../../models/record');
const records = require('../../data/records');
const User = require('../../models/user');
const users = require('../../data/users');

function updateOwner (user, record, index) {
  return User.findOne({ username: user })
    .then((owner) => {
      if (!owner) {
        throw new Error('Unknown owner ' + user);
      }
      record.owner[index] = owner._id;
    });
}

function updateOwnerId (record) {
  const promisesOfUpdatingOwnerId = record.owner.map((user, index) => updateOwner(user, record, index));
  return Promise.all(promisesOfUpdatingOwnerId);
}

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    return Record.remove({});
  })
  .then(() => {
    const promisesOfUpdatingOwnerId = records.map((record) => updateOwnerId(record));
    return Promise.all(promisesOfUpdatingOwnerId);
  })
  .then(() => {
    return Record.insertMany(records);
  })
  .then((result) => {
    console.log('successfully added to database', result);
    mongoose.connection.close();
  })

  .catch((error) => {
    console.log('there has been an error', error);
  });
