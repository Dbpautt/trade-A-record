'use strict'

const express = require('express')
const router = express.Router()

const Records = require('../models/record')

/* GET home page. */
router.get('/', (req, res, next) => {
  Records.find()
    .then((results) => {
      const data = {
        records: results
      }
      res.render('index', data)
    })
    .catch((error) => {
      console.log('there has been an error', error)
    })
})

module.exports = router
