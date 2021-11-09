const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const CRYPTO_LIST = require('../api/currencies.data')

// Models
const db = require('../database/export.database')
const Users = db.models.users
const Logs = db.models.logs

// Redirection
const usersCreateRoute = require('./users.create.routes')
const usersWalletRoute = require('./users.wallet.routes')

router.use('/', usersCreateRoute)
router.use('/wallet', usersWalletRoute)

router.get('/:id/activity', (req, res) => {
    // Send the user's activity

    Users.findOne({ id: req.params.id })
    .then(user => res.send(user.activity))
})

router.get('/:id/wallet', (req, res) => {
    // Send the user's wallet

    Users.findOne({ id: req.params.id })
    .then(user => res.send(user.wallet))
})


router.get('/:id', (req,res) => {
    // Get a specified user

    Users.findOne({ id: req.params.id })
    .then(user => res.send(user))
})

module.exports = router