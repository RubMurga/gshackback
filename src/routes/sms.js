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
    //const twiml = new MessagingResponse()
    //console.log(twiml.toString(), twiml.message())
    let data = []
    await firebase.collection('ubicaciones').doc('b0YZVOXVr4N7Z03whP0I').get()
    .then((snapshot) => {
      console.log(snapshot.data())
      if (snapshot.data() != undefined || snapshot.data().length == 0){
        console.log('hola1')
        data.push({
          lat: req.body.Body.lat,
          long: req.body.Body.lng
        })
        console.log(data)
      }
      else {
        console.log('hola 2')
        data = snapshot.data()
        data.push({
          lat: req.body.Body.lat,
          long: req.body.Body.long
        })
      }
    })
    .catch((err) => {
      console.log(err)
    });

    let alerts = firebase.collection('ubicaciones').doc('b0YZVOXVr4N7Z03whP0I');

    let setAda = alerts.set({
      ubicacion: data
    });
    res.send({'message' : 'this is a message'})
  }))

module.exports = router