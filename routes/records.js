'use strict'

const express = require('express')
const router = express.Router()

// const ObjectId = require('mongoose').Types.ObjectId;

const Records = require('../models/record')
const Trade = require('../models/trade')
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

router.post('/:recordId/:ownerId/trade', (req, res, next) => {
  const id = req.params.recordId
  const owner = req.params.ownerId

  Records.find({ owner: req.session.currentUser._id })
    .then((results) => {
      let myRecords = results
      const trade = new Trade({ status: 'pending', recordRequested: id, recordOffered: myRecords, requestMaker: req.session.currentUser._id, requestApprover: owner })
      trade.save()
        .then(() => {
          Trade.find(trade)
            .then((results) => {
              const data = {
                trade: results
              }
              res.render('record-trade', data)
            })
        })
    })
    .catch(next)
})

// _______________________________________________________

router.get('/:recordId/trade', (req, res, next) => {
  const id = req.params.recordId

  // if (!ObjectId.isValid(id)) {
  //   return res.redirect('/projects');
  // }
  Records.find({ _id: id })
    .then((results) => {
      const data = {
        records: results
      }
      res.render('record-trade', data)
    })
    .catch((error) => {
      console.log('there has been an error', error)
      return res.redirect('/records')
    })
})

module.exports = router

// router.get('/records', (req, res, next) => {
//   Records.find({ owner: req.session.currentUser._id })
//     .then((results) => {
//       const data = {
//         records: results
//       }
//       res.render('own-records', data)
//     })
//     .catch((error) => {
//       console.log('there has been an error', error)
//     })
// })