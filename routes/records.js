'use strict'

const express = require('express')
const router = express.Router()

// const ObjectId = require('mongoose').Types.ObjectId;

const Records = require('../models/record')
// const User = require('../models/user')

/* GET records page. */
router.get('/', (req, res, next) => {
  Records.find()
    .then((results) => {
      const data = {
        records: results
      }
      res.render('records', data)
    })
    .catch((error) => {
      console.log('there has been an error', error)
    })
})

/* GET records detail page. */
router.get('/:recordId', (req, res, next) => {
  const id = req.params.recordId

  // if (!ObjectId.isValid(id)) {
  //   return res.redirect('/projects');
  // }
  Records.find({ _id: id })
    .then((results) => {
      const data = {
        records: results
      }
      res.render('record-detail', data)
    })
    .catch((error) => {
      console.log('there has been an error', error)
      return res.redirect('/records')
    })
})

module.exports = router
