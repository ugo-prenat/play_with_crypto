const express = require('express')
const db = require('../database/export.database')
const router = express.Router()
const bcrypt = require('bcrypt')

const Users = db.models.users
const Logs = db.models.logs

router.post('/create', async (req, res) => {
    const user = JSON.parse(req.body)

    if (await isUsernameAlreadyTaken(user.username)) res.send({ usernameError: 'Nom d\'utilisateur déjà existant' })
    else if (await isMailAlreadyTaken(user.mail)) res.send({ mailError: 'Mail déjà existant' })
    else await createUser(user).then(userId => res.send({ userId }))

})
router.post('/connection', async (req, res) => {
    const userReq = JSON.parse(req.body)
    const userLogs = await getUserLogs(userReq)
    
    if (userLogs.mailError) res.send({ mailError: 'Mail associé à aucun compte' })
    else if (userLogs.passwordError) res.send({ passwordError: 'Mot de passe incorrect' })
    else res.send({ isLogCorrect: true })

})
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
router.post('/buy', async (req, res) => {
    const posted = JSON.parse(req.body)
    const data = {
        currencyAmount: posted.currencyAmount,
        cryptoAmount: posted.cryptoAmount,
        cryptoName: posted.cryptoName
    }

    if (await isCryptoAlreadyInWallet()) {
        console.log('Create new entry in wallet');
    } else {
        createNewCryptoInWallet()
    }

    console.log(data);

    updateActivity()
})

async function updateActivity() {

}
async function isCryptoAlreadyInWallet() {

}
async function createNewCryptoInWallet() {

}
async function updateActivity() {

}
async function isUsernameAlreadyTaken(newUsername) {
    const logList = await Logs.find()
    let foundMatch = false

    logList.forEach(log => {
        if (log.username === newUsername) {
            foundMatch = true
        }
    })
    return foundMatch
}
async function isMailAlreadyTaken(newMail) {
    const logList = await Logs.find()
    let foundMatch = false

    logList.forEach(log => {
        if (log.mail === newMail) foundMatch = true
    })
    return foundMatch
}
async function createUser(user) {
    // First, save the new user in Users model

    const newUser = new Users({
        id: await generateUserId(),
        username: user.username,
        mail: user.mail,
        password: user.password,
        profilImg: 'https://imgr.search.brave.com/wsi2pod4FQkPRjzlUJHTecm3MAfSgOWSDRR2xGw95j8/fit/1200/1200/ce/1/aHR0cHM6Ly9vYXN5/cy5jaC93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMy9waG90/by1hdmF0YXItcHJv/ZmlsLnBuZw',
        wallet: {
            amount: 0,
            currency: {
                name: 'EUR',
                symbol: '€'
            }
        },
        crypto: [],
        activity: []
    })

    await newUser.save()

    // Then, save the new user in Logs model
    const newUserLogs = new Logs({
        username: user.username,
        mail: user.mail,
        password: user.password,
    })

    await newUserLogs.save()

    return newUser.id
}
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
function isPasswordCorrect(password) {
    return true
}
async function generateUserId() {
    // Get total number of users and return it plus 1
    let toReturn
    await Logs.find().then(logs => toReturn = logs.length)
    return toReturn + 1
}

module.exports = router