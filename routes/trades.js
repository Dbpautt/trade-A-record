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
      const data = {
        records: results
      }
      res.render('trade-detail', data)
    })
    .catch(next)
})

module.exports = router
