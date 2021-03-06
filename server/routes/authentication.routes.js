require('dotenv').config()

const bcrypt = require('bcrypt')
const saltRounds = 10;

const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const authenticateToken = require('../middleware/authenticateToken')

const db = require('../database/export.database')
const Users = db.models.users
const Logs = db.models.logs

const mailer = require('../middleware/mailer')


router.post('/login', async (req, res) => {
    const body = JSON.parse(req.body)
    const mail = body.mail
    const password = body.password
    const user = await Logs.findOne({mail})

    if (!user) {
        return res.status(400).send({ code: 400, type: 'mail', msg: 'Ce mail n\'est rattaché à aucun compte' })
    }
    // Check if the given password is correct
    else if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ code: 400, type: 'password', msg: 'Mot de passe incorrect' })
    }

    const accessToken = generateAccessToken(user)
    res.status(200).send({ code: 200, data: {id: user.id, accessToken }})
})

router.post('/register', async (req, res) => {
    const body = JSON.parse(req.body)
    const username = body.username
    const mail = body.mail
    const password = bcrypt.hashSync(body.password, saltRounds)

    if (await Logs.findOne({username})) {
        return res.status(400).send({ code: 400, type: 'username', msg: 'Nom d\'utilisateur déjà pris' })
    }
    else if (await Logs.findOne({mail})) {
        return res.status(400).send({ code: 400, type: 'mail', msg: 'Mail déjà rattaché à un compte' })
    }

    const userId = await generateUserId()
    await createUser(userId, username, mail, password)
    await createLogs(userId, username, mail, password)
    .then(logs => {
        const accessToken = generateAccessToken(logs)
        // Send the register confirmation email
        mailer.registerConfirmation(logs.mail)
        // Send an account creation mail to an admin
        mailer.accountCreation(logs)

        res.status(200).send({ code: 200, data: {id: logs.id, accessToken }})
    })
})
router.post('/guest', async (req, res) => {
    // Register a new user as a guest
    const userId = await generateUserId()
    await createGuest(userId)
    await createLogs(userId, `Invité ${userId}`, null, null)
    .then(logs => {
        const accessToken = generateAccessToken(logs)
        res.status(200).send({ code: 200, data: {id: logs.id, accessToken }})
        // Send an account creation mail to an admin
        mailer.accountCreation(logs)
    })
})
router.post('/mail', async (req, res) => {
    // Check if the given mail is associated to an account
    // Method called from the reset password form
    const mail = JSON.parse(req.body).mail
    const user = await Logs.findOne({mail})

    if (!user) {
        return res.status(400).send({ code: 400, msg: 'Ce mail n\'est rattaché à aucun compte' })
    } else {
        // Send the reset password email
        mailer.resetPassword(user.mail, generateAccessToken(user))
        res.status(200).send({ code: 200, msg: 'Email envoyé' })
    }

})
router.get('/', authenticateToken, (req, res) => {
    // check if the user if authenticated
    res.status(200).send({ code: 200, user: req.user })
})
router.patch('/user/:id', authenticateToken, async (req, res) => {
    // Change password function
    // Called from the "changePasswordForm" component
    const body = JSON.parse(req.body)
    const oldPassword = body.oldPassword
    const newPassword = bcrypt.hashSync(body.newPassword, saltRounds)

    const user = await Users.findOne({ id: req.params.id })
    const log = await Logs.findOne({ id: req.params.id })

    const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password)

    if (!isPasswordCorrect) res.status(400).send({ code: 400, msg: 'Mot de passe incorrect' })
    else {
        // Update password
        user.password = newPassword
        log.password = newPassword

        await user.save()
        await log.save()

        // Send the change confirmation email
        const accessToken = generateAccessToken(log)
        mailer.changePasswordConfirmation(log.mail, accessToken)

        res.status(200).send({ code: 200, msg: 'Mot de passe mis à jour' })
    }
})


async function createUser(id, username, mail, password) {
    const user = new Users({
        id,
        username,
        mail,
        password,
        profilImg: 'https://imgr.search.brave.com/wsi2pod4FQkPRjzlUJHTecm3MAfSgOWSDRR2xGw95j8/fit/1200/1200/ce/1/aHR0cHM6Ly9vYXN5/cy5jaC93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMy9waG90/by1hdmF0YXItcHJv/ZmlsLnBuZw',
        showFirstConnectionMsg: true,
        wallet: [
            {
                name: 'euro',
                symbol: 'EUR',
                base: '€',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg',
                currencyAmount: 100,
                cryptoAmount: 100
            }
        ],
        activity: []
    })
    await user.save()
}
async function createGuest(id) {
    const guest = new Users({
        id,
        username: `Invité ${id}`,
        profilImg: 'https://imgr.search.brave.com/wsi2pod4FQkPRjzlUJHTecm3MAfSgOWSDRR2xGw95j8/fit/1200/1200/ce/1/aHR0cHM6Ly9vYXN5/cy5jaC93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMy9waG90/by1hdmF0YXItcHJv/ZmlsLnBuZw',
        showFirstConnectionMsg: true,
        wallet: [
            {
                name: 'euro',
                symbol: 'EUR',
                base: '€',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg',
                currencyAmount: 100,
                cryptoAmount: 100
            }
        ],
        activity: []
    })
    await guest.save()
}
async function createLogs(id, username, mail, password) {
    const logs = new Logs({ id, username, mail, password })
    await logs.save()
    return logs
}
async function generateUserId() {
    const userList = await Logs.find()
    const lastUserId = userList[userList.length - 1].id
    return lastUserId + 1
}
function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
}
async function isPasswordCorrect(user, password) {
    if (user.password !== password) return false
    else return true
}

module.exports = router