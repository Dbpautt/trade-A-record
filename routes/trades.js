'use strict'

const express = require('express')
const router = express.Router()

/* GET trades page. */
router.get('/trades', (req, res, next) => {
  res.render('trades', { title: 'Express' })
})

module.exports = router
