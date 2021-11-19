const express = require('express')
const router = express.Router()
const Crypto = require('../database/export.database').models.crypto
const cryptoList = require('../api/currencies.data')

router.get('/prices', (req, res) => {
    Crypto.findOne().then(result => res.send(result.prices))
})
router.get('/list', (req, res) => {
    res.send(cryptoList)
})
/* router.get('/:base', (req, res) => {
    const base = req.params.base
    Crypto.findOne().then(cryptoList => {
        cryptoList.prices.forEach(crypto => {
            if (crypto.base === base) {
                res.send({ amount: parseInt(crypto.amount)})
            }
        })
    })
}) */
module.exports = router