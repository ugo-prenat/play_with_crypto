const express = require('express')
const router = express.Router()
const Prices = require('../database/export.database').models.prices


router.get('/prices', (req, res) => {
    Prices.find().then(result => res.send(result[0].prices))
})

module.exports = router