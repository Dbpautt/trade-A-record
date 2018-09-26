'use strict';

const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Records = require('../models/record');
const Trades = require('../models/trade');

/* GET trades page. */

router.get('/:tradeId', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const id = req.params.tradeId;

  if (!ObjectId.isValid(id)) {
    return next();
  }
  Trades.find({ _id: id })
    .then((results) => {
      if (!results.length) {
        return next();
      }
      const requestedRecordId = results[0].recordRequested;
      return Records.findOne({ _id: requestedRecordId })
        .then((result) => {
          const offeredRecordId = results[0].recordOffered;
          return Records.findOne({ _id: offeredRecordId })
            .then((result2) => {
              const data = {
                requestedRecord: result,
                offeredRecord: result2
              };
              res.render('trade-detail', data);
            });
        });
    })
    .catch(next);
});

/* POST trades accept */

router.post('/:tradeId/accept', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const tradeId = req.params.tradeId;

  Trades.findOne({ _id: tradeId })
    .then((trade) => {
      if (!trade) {
        return next();
      }
      return Trades.findOne({ _id: tradeId })
        .then((appover) => {
          if (!appover._id.equals(req.session.currentUser._id)) {
            return next();
          }

          const data = {
            trade: trade.requestApprover,
            recordRequested: requestedRecordId,
            recordOffered: offeredRecordId,
            requestMaker: req.session.currentUser._id,
            requestApprover: requestedRecord.owner };
          const trade = new Trade(data);
          return trade.save()
            .then(() => {
              console.log(trade._id);
              var tradeID = trade._id;
              res.redirect(`/profile/inbox`);
            });
        });
    });
  res.redirect('/profile/inbox')
    .catch(next);
});

// return Records.findOneAndUpdate({ _id: offeredRecordId })
//   .then((offeredRecord) => {
//     if (!offeredRecord) {
//       return next();
//     }
//     if (!offeredRecord.owner.equals(req.session.currentUser._id)) {
//       return next();
//     }

//   });
module.exports = router;
