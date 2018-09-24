'use strict'

const express = require('express')
const router = express.Router()

const ObjectId = require('mongoose').Types.ObjectId

const Records = require('../models/record')
const Trade = require('../models/trade')

/* GET trades page. */
router.get('/trades', (req, res, next) => {
  res.render('trades', { title: 'Express' })
})

router.get('/:tradeId', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup')
  }
  const id = req.params.tradeId

  if (!ObjectId.isValid(id)) {
    return next()
  }
  Trade.find({ _id: id })
    .then((results) => {
      if (!results.length) {
        return next()
      }
      const requestedRecordId = results[0].recordRequested
      return Records.findOne({ _id: requestedRecordId })
        .then((result) => {
          const offeredRecordId = results[0].recordOffered
          return Records.findOne({ _id: offeredRecordId })
            .then((result2) => {
              const data = {
                requestedRecord: result,
                offeredRecord: result2
              }
              res.render('trade-detail', data)
            })
        })
    })
    .catch(next)
})

module.exports = router
