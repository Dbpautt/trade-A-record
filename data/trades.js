'use strict';

const trades = [{
  status: 'pending',
  recordRequested: 'Legend',
  recordOffered: 'G.I. Blues',
  requestMaker: ['user2'],
  requestApprover: ['user1']
}, {
  status: 'pending',
  recordRequested: 'Help!',
  recordOffered: 'Nevermind',
  requestMaker: ['user2'],
  requestApprover: ['user1']
}, {
  status: 'pending',
  recordRequested: 'Free the Universe',
  recordOffered: 'The times they are a-changin’',
  requestMaker: ['user1'],
  requestApprover: ['user2']
}];

module.exports = trades;
