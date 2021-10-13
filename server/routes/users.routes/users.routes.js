const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const CRYPTO_LIST = require('../../api/currencies.data')

// Models
const db = require('../../database/export.database')
const Users = db.models.users
const Logs = db.models.logs

// Redirection
const usersBuyRoute = require('./users.buy.routes')
const usersSellRoute = require('./users.sell.routes')
const usersCreateRoute = require('./users.create.routes')

router.post('/create', usersCreateRoute)
router.post('/buy', usersBuyRoute)
router.post('/sell', usersSellRoute)


router.get('/:username', (req,res) => {
    Users.find({ username: req.params.username })
    .then(user => {
        const toReturn = {
            id: user[0].id,
            walletAmount: user[0].wallet.amount,
            currency: user[0].wallet.currency.symbol,
            icon: user[0].profilImg
        }
        res.send(toReturn)
    })
})
router.get('/:id/crypto', (req,res) => {
    res.send({msg: 'Crypto of ' + req.params.id})
})
router.get('/:id/activity', (req,res) => {
    // res.send({msg: 'Activity of ' + req.params.id})
    res.send([])
})
router.get('/:id/wallet', (req, res) => {
    // res.send({msg: 'Wallet of ' + req.params.id})
    res.send([])
})

module.exports = router