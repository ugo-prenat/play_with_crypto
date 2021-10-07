const express = require('express')
const router = express.Router()
const Crypto = require('../database/export.database').models.crypto


router.get('/prices', (req, res) => {
    Crypto.find().then(result => res.send(result[0].prices))
})

module.exports = router