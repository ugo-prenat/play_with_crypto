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


router.get('/:id', (req,res) => {
    // Get a specified user

    Users.find({ id: req.params.id })
    .then(user => res.send(user[0]))
})

module.exports = router