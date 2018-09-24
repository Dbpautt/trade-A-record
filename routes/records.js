'use strict'

const express = require('express')
const router = express.Router()

const ObjectId = require('mongoose').Types.ObjectId

const Records = require('../models/record')
const Trade = require('../models/trade')
const User = require('../models/user')

/* GET records page. */
router.get('/', (req, res, next) => {
  Records.find()
    .then((results) => {
      const data = {
        records: results
      }
      res.render('records', data)
    })
    .catch(next)
})

/* GET records detail page. */
router.get('/:recordId', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/signup')
  }
  const id = req.params.recordId

  if (!ObjectId.isValid(id)) {
    return res.redirect('/records')
  }
  Records.find({ _id: id })
    .then((results) => {
      if (!ObjectId.isValid(id)) {
        return res.redirect('/records')
      }
      const data = {
        records: results
      }
      res.render('record-detail', data)
    })
    .catch(next)
})

router.get('/:recordId/request', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/signup')
  }
  const id = req.params.recordId

  if (!ObjectId.isValid(id)) {
    return res.redirect('/records')
  }
  Records.findOne({ _id: id })
    .then((result) => {
      if (!ObjectId.isValid(id)) {
        return res.redirect('/records')
      }
      Records.find({ owner: req.session.currentUser._id })
        .then(results => {
          if (!ObjectId.isValid(id)) {
            return res.redirect('/records')
          }
          const data = {
            requestedRecord: result,
            myRecords: results
          }
          res.render('record-trade', data)
        })
    })
    .catch(next)
})

// router.post('/:recordId/:ownerId/trade', (req, res, next) => {
// if (!req.session.currentUser) {
//   res.redirect('/auth/signup')
// }
//   const id = req.params.recordId
//   const owner = req.params.ownerId

//   Records.find({ owner: req.session.currentUser._id })
//     .then((results) => {
//       let myRecords = results
//       const trade = new Trade({ status: 'pending', recordRequested: id, recordOffered: myRecords, requestMaker: req.session.currentUser._id, requestApprover: owner })
//       trade.save()
//         .then(() => {
//           console.log(trade._id)
//           var tradeID = trade._id
//           res.redirect(`/records/trade/${tradeID}`)
//         })
//     })
//     .catch(next)
// })

// _______________________________________________________

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
