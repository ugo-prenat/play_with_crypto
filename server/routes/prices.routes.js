const express = require('express')
const router = express.Router()
const Prices = require('../database/export').models.prices

API_PATH = 'https://api.coinbase.com/v2/prices'

const cryptoList = [
    'BTC', 'ETH', 'ADA',
    'USDT', 'SOL', 'DOT',
    'DOGE', 'UNI', 'LINK',
    'LTC', 'BAT', 'GRT']

const currencyList = [
    { name: 'EUR', symbol: '€' },
    { name: 'USD', symbol: '$' }
]

router.get('/prices', (req, res) => {
    Prices.find().then(result => res.send(result[0].prices))
})

module.exports = router