'use strict'
const express = require('express')
const lies = require('./lies')
const path = require('path')
var app = express()
app.use(express.static(path.resolve(__dirname, 'public')))
app.get('/api/bullshit/:id?*', function (req, res) {
  const { id } = req.params
  return res.send(id ? lies[id] : lies)
})
app.listen(process.env.PORT || 4000)
