'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/signup', (req, res, next) => {
  const signupError = req.flash('signup-form-error')
  const usernameError = req.flash('username-form-error')
  const usernameData = req.flash('username-data')
  const data = {
    message1: signupError[0],
    message2: usernameError[0],
    fields: usernameData[0]
  }
  res.render('signup', data)
})

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    req.flash('signup-form-error', 'Username and password are mandatory')
    req.flash('username-data', { username })
    return res.redirect('/auth/signup')
  }
  User.findOne({ username })
    .then(result => {
      if (result) {
        req.flash('username-form-error', 'This username is already taken :( ')
        return res.redirect('/auth/signup')
      }
      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)
      const user = new User({ username, password: hashedPassword })
      return user.save()
        .then(() => {
          req.session.currentUser = user
          res.redirect('/')
        })
    })
    .catch(next)
})

router.get('/login', (req, res, next) => {
  const loginError = req.flash('login-form-error')
  const loginData = req.flash('login-form-data')
  const usernameLoginError = req.flash('usernamelogin-form-error')
  const data = {
    fields: loginData[0],
    message1: loginError[0],
    message2: usernameLoginError[0]
  }
  res.render('login', data)
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    req.flash('login-form-error', 'Username and password are mandatory')
    req.flash('login-form-data', { username })
    return res.redirect('/auth/login')
  }
  User.findOne({ username })
    .then(result => {
      if (!result) {
        req.flash('usernamelogin-form-error', 'Incorrect pasword or username')
        return res.redirect('/auth/login')
      }
      if (!bcrypt.compareSync(password, result.password)) {
        req.flash('usernamelogin-form-error', 'Incorrect pasword or username')
        return res.redirect('/auth/login')
      }
      req.session.currentUser = result
      res.redirect('/')
    })
    .catch(next)
})

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser
  res.redirect('/')
})

module.exports = router
