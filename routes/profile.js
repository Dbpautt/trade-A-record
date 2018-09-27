'use strict';

const express = require('express');
const router = express.Router();

// const ObjectId = require('mongoose').Types.ObjectId;

const Records = require('../models/record');
const Trades = require('../models/trade');
// const User = require('../models/user')

/* GET profile page. */
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  Records.find({ owner: req.session.currentUser._id })
    .then((results) => {
      const data = {
        records: results
      };
      res.render('profile', data);
    })
    .catch((error) => {
      console.log('there has been an error', error);
    });
});

// router.get('/records', (req, res, next) => {
//   Records.find({ owner: req.session.currentUser._id })
//     .then((results) => {
//       const data = {
//         records: results
//       };
//       res.render('own-records', data);
//     })
//     .catch((error) => {
//       console.log('there has been an error', error);
//     });
// });

router.get('/inbox', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  Trades.find({ requestApprover: req.session.currentUser._id })
    .populate('recordRequested')
    .populate('recordOffered')

    .then((results) => {
      if (!results) {
        return next();
      }
      const data = {
        trades: results
      };
      res.render('inbox', data);
    })
    .catch(next);
});

router.get('/requests', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  Trades.find({ requestMaker: req.session.currentUser._id })
    .populate('recordRequested')
    .populate('recordOffered')

    .then((results) => {
      if (!results) {
        return next();
      }
      const data = {
        trades: results
      };
      res.render('requests', data);
    })
    .catch(next);
});

module.exports = router;
