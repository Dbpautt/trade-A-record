'use strict'

const express = require('express')
const router = express.Router()

/* GET profile page. */
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/')
  }
  res.render('profile')
})

module.exports = router
