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

router.post('/', usersCreateRoute)
router.post('/buy', usersBuyRoute)
router.post('/sell', usersSellRoute)

router.post('/connection', async (req, res) => {
    const userReq = JSON.parse(req.body)
    const userLogs = await getUserLogs(userReq)
    
    if (userLogs.mailError) res.send({ mailError: 'Mail associé à aucun compte' })
    else if (userLogs.passwordError) res.send({ passwordError: 'Mot de passe incorrect' })
    else res.send({ isLogCorrect: true })

})
router.get('/:id', (req,res) => {
    Users.find({ id: req.params.id })
    .then(user => res.send(user[0]))
})
router.get('/:id/crypto', (req,res) => {
    res.send({msg: 'Crypto of ' + req.params.id})
})
router.get('/:id/activity', (req,res) => {
    // res.send({msg: 'Activity of ' + req.params.id})
    res.send([])
})
router.get('/:id/wallet', (req, res) => {
    Users.find({ id: req.params.id })
    .then(user => res.send(user[0].wallet))
})
async function getUserLogs(userLogs) {
    let toReturn = { mailError: true, passwordError: false }

    await Logs.find().then(logList => {
        for (let i = 0; i < logList.length; i++) {
            const log = logList[i];
            if (log.mail === userLogs.mail) {
                toReturn.mailError = false
                if (isPasswordCorrect(userLogs.password)) toReturn = log
                else toReturn = { passwordError: true }
                break
            }
        }
    })
    return toReturn
}

module.exports = router