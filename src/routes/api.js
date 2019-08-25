const jwt = require('jsonwebtoken')
const User = require('../models/user');
const express = require('express')
const router = express.Router()
const {wrap} = require('./../util/wrap')

router.route('/')
  .post(wrap(async (req, res) => {
    let alerts = firebase.collection('alertas').doc('alovelace');

    let setAda = alerts.set({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    });
    res.send({'message' : 'this is a message'})
  }))

module.exports = router