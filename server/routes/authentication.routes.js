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



router.post('/login', async (req, res) => {
    const body = JSON.parse(req.body)
    const mail = body.mail
    const password = body.password
    const user = await Logs.findOne({mail})

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)

    if (!user) {
        return res.status(400).send({ code: 400, type: 'mail', msg: 'Ce mail n\'est rattaché à aucun compte' })
    }
    else if (!isPasswordCorrect) {
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
    })
})
router.get('/', authenticateToken, (req, res) => {
    res.status(200).send({code: 200})
})


async function createUser(id, username, mail, password) {
    const user = new Users({
        id,
        username,
        mail,
        password,
        profilImg: 'https://imgr.search.brave.com/wsi2pod4FQkPRjzlUJHTecm3MAfSgOWSDRR2xGw95j8/fit/1200/1200/ce/1/aHR0cHM6Ly9vYXN5/cy5jaC93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMy9waG90/by1hdmF0YXItcHJv/ZmlsLnBuZw',
        wallet: [
            {
                name: 'euro',
                symbol: 'EUR',
                base: '€',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg',
                currencyAmount: 50,
                cryptoAmount: 50
            }
        ],
        activity: []
    })
    bcrypt.compareSync('21422142Prenut&', user.password)
    await user.save()
}
async function createGuest(id) {
    const guest = new Users({
        id,
        username: `Invité ${id}`,
        profilImg: 'https://imgr.search.brave.com/wsi2pod4FQkPRjzlUJHTecm3MAfSgOWSDRR2xGw95j8/fit/1200/1200/ce/1/aHR0cHM6Ly9vYXN5/cy5jaC93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMy9waG90/by1hdmF0YXItcHJv/ZmlsLnBuZw',
        wallet: [
            {
                name: 'euro',
                symbol: 'EUR',
                base: '€',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg',
                currencyAmount: 50,
                cryptoAmount: 50
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