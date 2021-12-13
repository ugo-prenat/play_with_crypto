const express = require('express')
const router = express.Router()

const authenticateToken = require('../middleware/authenticateToken')

const bcrypt = require('bcrypt')
const saltRounds = 10;

const db = require('../database/export.database')
const Users = db.models.users
const Logs = db.models.logs

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
router.patch('/:id/password', authenticateToken, async (req, res) => {
    console.log('good adress');
    // Set new user's password
    const reqPassword = JSON.parse(req.body).newPassword
    const newPassword = bcrypt.hashSync(reqPassword, saltRounds)

    const user = await Users.findOne({ id: req.params.id })
    const userLogs = await Logs.findOne({ id: req.params.id })

    user.password = newPassword
    userLogs.password = newPassword

    await user.save()
    await userLogs.save()
    .then(() => res.status(200).send({ code: 200, msg: 'Mot de passe mis à jour' }))
})
router.patch('/:id', authenticateToken, async (req, res) => {
    // Update the profile image of the user
    const user = await Users.findOne({ id: req.params.id })
    const newProfileImg = JSON.parse(req.body).profileImg

    user.profilImg = newProfileImg

    await user.save()
    .then(() => res.status(200).send({ code: 200, msg: 'Image de profil mise à jour' }))
})

module.exports = router