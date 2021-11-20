const express = require('express')
const router = express.Router()

const authenticateToken = require('../middleware/authenticateToken')

// Models
const db = require('../database/export.database')
const Users = db.models.users

// Redirection
const usersWalletRoute = require('./users.wallet.routes')
router.use('/wallet', usersWalletRoute)

router.get('/:id/activity', authenticateToken, (req, res) => {
    // Send the user's activity
    Users.findOne({ id: req.params.id })
    .then(user => res.send(user.activity))
})

router.get('/:id/wallet', authenticateToken, (req, res) => {
    // Send the user's wallet
    Users.findOne({ id: req.params.id })
    .then(user => res.send(user.wallet))
})

router.get('/:id', authenticateToken, (req,res) => {
    // Get a specified user
    Users.findOne({ id: req.params.id })
    .then(user => res.send(user))
})

module.exports = router