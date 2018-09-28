'use strict';

const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Record = require('../models/record');
const Trade = require('../models/trade');
const tradeController = require('../controllers/trade');

/* GET trade page. */

router.get('/:tradeId', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const id = req.params.tradeId;

  if (!ObjectId.isValid(id)) {
    return next();
  }
  tradeController.getTradeInfo(id)
    .then((tradeInfo) => {
      if (!tradeInfo) {
        return next();
      }
      const data = {
        requestedRecord: tradeInfo.requestedRecord,
        offeredRecord: tradeInfo.offeredRecord,
        tradeId: tradeInfo.tradeId,
        isApprover: tradeInfo.approver.equals(req.session.currentUser._id)
      };
      res.render('trade-detail', data);
    })
    .catch(next);
});

/* POST trade accept */

router.post('/:tradeId/accept', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const tradeId = req.params.tradeId;

  Trade.findOne({ _id: tradeId })
    .then((trade) => {
      if (!trade) {
        return next();
      }
      if (!trade.requestApprover._id.equals(req.session.currentUser._id)) {
        return next();
      }
      return Record.findByIdAndUpdate(trade.recordOffered, { owner: trade.requestApprover })
        .then(() => {
          return Record.findByIdAndUpdate(trade.recordRequested, { owner: trade.requestMaker });
        })
        .then(() => {
          return Trade.findByIdAndUpdate(tradeId, { status: 'approved' });
        })
        .then(() => {
          return Trade.updateMany({
            $and: [
              { $or: [
                { recordRequested: trade.recordOffered },
                { recordRequested: trade.recordRequested },
                { recordOffered: trade.recordOffered },
                { recordOffered: trade.recordRequested }
              ]
              },
              { status: 'pending' }
            ] },
          { $set: { status: 'no longer available' }
          });
        });
    })
    .then(() => {
      res.redirect('/profile/inbox');
    })
    .catch(next);
});

router.post('/:tradeId/reject', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const tradeId = req.params.tradeId;

  Trade.findOne({ _id: tradeId })
    .then((trade) => {
      if (!trade) {
        return next();
      }
      if (!trade.requestApprover._id.equals(req.session.currentUser._id)) {
        return next();
      }
      return Trade.findByIdAndUpdate(tradeId, { status: 'rejected' })
        .then(() => {
          res.redirect('/profile/inbox');
        })
        .catch(next);
    });
});

router.post('/:tradeId/delete', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const id = req.params.tradeId;

  if (!ObjectId.isValid(id)) {
    return res.redirect('/profile');
  }

  Trade.findOne({ _id: id })
    .then((trade) => {
      if (!trade) {
        return next();
      }
      if (!trade.requestMaker.equals(req.session.currentUser._id)) {
        return next();
      }
      return Trade.remove({ _id: id })
        .then(() => {
          res.redirect('/');
        });
    })
    .catch(next);
});

module.exports = router;
