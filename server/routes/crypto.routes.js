const express = require('express')
const router = express.Router()
const Crypto = require('../database/export.database').models.crypto
const cryptoList = require('../api/currencies.data')

router.get('/prices', (req, res) => {
    Crypto.find().then(result => res.send(result[0].prices))
})
router.get('/list', (req, res) => {
    res.send(cryptoList)
})
module.exports = router