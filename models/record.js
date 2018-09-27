'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const recordSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  artist: {
    type: String,
    required: true
  },
  coverImageURL: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: ['Country', 'Pop', 'Rock', 'Metal', 'Hip-hop', 'Punk', 'Alternative'],
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    enum: ['Great', 'As new', 'Good', 'Used', 'Scratched'],
    required: true
  }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
