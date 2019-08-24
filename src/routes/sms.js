const jwt = require('jsonwebtoken')
const User = require('../models/user');
const express = require('express')
const router = express.Router()
const {wrap} = require('./../util/wrap')
const MessagingResponse = require('twilio').twiml.MessagingResponse;


router.route('/')
  .post(wrap(async (req, res) => {
    console.log(req.body.Body) // aquí esta el contenido
    console.log('a message just arrived.')
    const twiml = new MessagingResponse()
    console.log(twiml.toString(), twiml.message())
    res.send({'message' : 'this is a message'})
  }))

module.exports = router