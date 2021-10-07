const express = require('express')
const db = require('../database/export.database')
const router = express.Router()

const Users = db.models.users
const Logs = db.models.logs

router.post('/create', async (req, res) => {
    const user = JSON.parse(req.body)

    const newUser = new Users({
        id: await generateUserId(),
        username: user.username,
        email: user.email,
        password: user.password,
        profilImg: user.profilImg,
        wallet: {
            amount: 0,
            currency: {
                name: user.wallet.balance.currency.name,
                symbol: user.wallet.balance.currency.symbol
            }
        },
        crypto: [],
        activity: []
    })

    newUser.save()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400))
})
router.get('/:id', (req,res) => {
    Users.find({ id: req.params.id })
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


/* router.post('/searchToken', (req, res) => {
    const token = req.body

    Users.findById(token)
    .then(() => res.send({ response: true }))
    .catch(() => res.send({ response: false }))
}) */
/* router.post('/getById', (req, res) => {
    const userId = req.body
    Users.findById(userId).then(user => res.send(user))
}) */

async function generateUserId() {
    // Get total number of users and return it plus 1
    let toReturn

    Logs.find().then(logs => toReturn = logs.length)

    return toReturn + 1
}

module.exports = router