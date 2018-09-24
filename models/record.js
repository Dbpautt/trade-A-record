'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

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
    required: true
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
    enum: ['country', 'pop', 'rock', 'metal', 'hip-hop', 'punk', 'alternative'],
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    enum: ['great', 'as new', 'good', 'used', 'scratched'],
    required: true
  }
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record
