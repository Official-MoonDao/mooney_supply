const express = require('express')
const sleep = require('ko-sleep');
const app = express.Router()
 

app.get('/circulating', (req, res) => {
  res.json(req.chainData.eth.circulatingSupply.value)
})
app.get('/total', (req, res) => {
  res.json(req.chainData.eth.totalSupply.value)
})



module.exports = app