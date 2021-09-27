const express = require('express')
const db = require('../database/export.database')
const router = express.Router()

const models = db.models
const Users = models.users

router.post('/create', (req, res) => {
    const user = JSON.parse(req.body)

    const newUser = new Users({
        username: user.username,
        email: user.email,
        password: user.password,
        profilImg: user.profilImg,
        wallet: {
            balance: {
                amount: 0,
                currency: {
                    name: user.wallet.balance.currency.name,
                    symbol: user.wallet.balance.currency.symbol
                }
            },
            crypto: []
        }
    })

    newUser.save()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400))
})
router.post('/searchToken', (req, res) => {
    const token = req.body

    Users.findById(token)
    .then(() => res.send({ response: true }))
    .catch(() => res.send({ response: false }))
})
router.post('/getById', (req, res) => {
    const userId = req.body
    Users.findById(userId).then(user => res.send(user))
})

module.exports = router