'use strict';

const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Record = require('../models/record');
const Trade = require('../models/trade');
// const User = require('../models/user');

/* GET records page. */
router.get('/', (req, res, next) => {
  let query = {};
  if (req.session.currentUser) {
    query = { owner: { $nin: [ req.session.currentUser._id ] } };
  }

  Record.find(query)
    .then((results) => {
      const data = {
        records: results
      };
      res.render('records', data);
    })
    .catch(next);
});

/* Create a reocrd */
router.get('/create', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const formData = req.flash('record-form-data');
  const formErrors = req.flash('record-form-error');
  const data = {
    message: formErrors[0],
    fields: formData[0]
  };
  res.render('record-create', data);
});

router.post('/create', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const { name, artist, coverImageURL, description, genre, releaseYear, condition, snippet } = req.body;

  if (!name || !artist || !coverImageURL || !description || !genre || !releaseYear || !condition) {
    req.flash('record-form-error', 'Include all required information to make your record stand out!');
    req.flash('record-form-data', { name, artist, coverImageURL, description, genre, releaseYear, condition });
    return res.redirect('/records/create');
  }

  // @todo put in data variable and make line below shorter
  const record = new Record({ owner: req.session.currentUser._id, name, artist, coverImageURL, description, genre, releaseYear, condition, snippet });
  return record.save()
    .then(() => {
      res.redirect(`/records/${record._id}`);
    })
    .catch(next);
});

/* GET records detail page. */
router.get('/:recordId', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const id = req.params.recordId;

  if (!ObjectId.isValid(id)) {
    return next();
  }

  Record.findOne({ _id: id })
    .populate('owner')
    .then((result) => {
      if (!result) {
        return next();
      }
      Trade.find({ recordRequested: result })
        .then((numberOfTrades) => {
          const data = {
            record: result,
            isOwner: result.owner._id.equals(req.session.currentUser._id),
            ongoingRequests: numberOfTrades.length
          };
          res.render('record-detail', data);
        });
    })
    .catch(next);
});

router.get('/:recordId/request', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const id = req.params.recordId;

  if (!ObjectId.isValid(id)) {
    return next();
  }
  Record.findOne({ _id: id })
    .then((result) => {
      if (!result) {
        return next();
      }
      if (result.owner.equals(req.session.currentUser._id)) {
        return next();
      }
      return Record.find({ owner: req.session.currentUser._id })
        .then(results => {
          if (!ObjectId.isValid(id)) {
            return res.redirect('/records');
          }
          const data = {
            requestedRecord: result,
            myRecords: results
          };
          res.render('record-trade', data);
        });
    })
    .catch(next);
});

router.post('/:requestedRecordId/:offeredRecordId/request', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const requestedRecordId = req.params.requestedRecordId;
  const offeredRecordId = req.params.offeredRecordId;

  if (!ObjectId.isValid(requestedRecordId)) {
    return next();
  }

  Record.findOne({ _id: requestedRecordId })
    .then((requestedRecord) => {
      if (!requestedRecord) {
        return next();
      }
      return Record.findOne({ _id: offeredRecordId })
        .then((offeredRecord) => {
          if (!offeredRecord) {
            return next();
          }
          if (!offeredRecord.owner.equals(req.session.currentUser._id)) {
            return next();
          }
          const data = {
            recordRequested: requestedRecordId,
            recordOffered: offeredRecordId,
            requestMaker: req.session.currentUser._id,
            requestApprover: requestedRecord.owner
          };
          const trade = new Trade(data);
          return trade.save();
        })
        .then((result) => {
          res.redirect(`/trades/${result._id}`);
        });
    })
    .catch(next);
});

router.post('/:recordId/delete', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/signup');
  }
  const id = req.params.recordId;

  if (!ObjectId.isValid(id)) {
    return res.redirect('/profile');
  }
  Trade.updateMany({
    $and: [
      { $or: [
        { recordRequested: id },
        { recordOffered: id }
      ] },
      { status: 'pending' }
    ] },
  { $set: { status: 'no longer available' }
  })
    .then(() => {
      return Record.remove({ _id: id })
        .then(() => {
          res.redirect('/profile');
        });
    })

    .catch(next);
});

// _______________________________________________________

module.exports = router;
