const jwt = require('jsonwebtoken')
const User = require('../models/user');
const express = require('express')
const router = express.Router()
const {wrap} = require('./../util/wrap')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var dateFormat = require('dateformat');

router.route('/')
  .post(wrap(async (req, res) => {
    console.log(req.body.Body) // aquí esta el contenido
    console.log('a message just arrived.')
    //const twiml = new MessagingResponse()
    //console.log(twiml.toString(), twiml.message())
    let data = {ubicacion : []}
    await firebase.collection('ubicaciones').doc(req.body.Body.id).get()
    .then((snapshot) => {
      console.log(snapshot.data())
      if (snapshot.data() == undefined || snapshot.data().ubicacion.length == 0){
        data.ubicacion.push({
          lat: req.body.Body.lat,
          long: req.body.Body.lng,
          time: new Date()
        })
        
      }
      else {
        data = snapshot.data()
        data.ubicacion.push({
          lat: req.body.Body.lat,
          long: req.body.Body.lng,
          time: new Date()
        })
      }
    })
    .catch((err) => {
      console.log(err)
    });
    let ubication = firebase.collection('ubicaciones').doc(req.body.Body.id);
    await ubication.set(data);
    let id = req.body.Body.id + dateFormat(new Date(), "yyyymmddhMMss");
    console.log(id)
    let alerta = firebase.collection('alertas').doc(id)
    await alerta.set({
      id: req.body.Body.id,
      time: new Date(),
      type: req.body.Body.type
    })
    res.send({'id' : id})
  }))

module.exports = router