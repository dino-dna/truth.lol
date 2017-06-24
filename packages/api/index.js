'use strict'
const micro = require('micro')
const lies = require('./lies')
const { createError } = micro
const server = micro(async (req, res) => {
  var [,, bullshit, id] = req.url.split('/')
  if (!bullshit || bullshit.indexOf('bullshit') === -1) return createError(400)
  return id ? lies[id] : lies
})
server.listen(process.env.PORT || 4000)
