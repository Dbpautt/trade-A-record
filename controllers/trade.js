'use strict';

const Record = require('../models/record');
const Trade = require('../models/trade');

const getTradeInfo = (id) => {
  return Trade.findOne({ _id: id })
    .then((result) => {
      if (!result) {
        return undefined;
      }
      const requestedRecordId = result.recordRequested;
      const offeredRecordId = result.recordOffered;
      const promiseOfFindingTheRequestedRecord = Record.findOne({ _id: requestedRecordId })
        .populate('owner');
      const promiseOfFindingTheOfferedRecord = Record.findOne({ _id: offeredRecordId })
        .populate('owner');
      return Promise.all([promiseOfFindingTheRequestedRecord, promiseOfFindingTheOfferedRecord])
        .then((results) => {
          const data = {
            requestedRecord: results[0],
            offeredRecord: results[1],
            tradeId: id,
            approver: result.requestApprover
          };
          return data;
        });
    });
};

module.exports = { getTradeInfo }
;
