'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tradeSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true
  },
  recordRequested: {
    type: ObjectId,
    ref: 'Record',
    required: true
  },
  recordOffered: {
    type: Object,
    ref: 'Record',
    required: true
  },
  requestMaker: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  requestApprover: {
    type: ObjectId,
    ref: 'User',
    required: true
  }

});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
