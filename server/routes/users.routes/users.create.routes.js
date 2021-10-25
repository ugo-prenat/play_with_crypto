const express = require('express')
const router = express.Router()

const db = require('../../database/export.database')
const Users = db.models.users
const Logs = db.models.logs

router.post('/', async (req, res) => {
    //const user = JSON.parse(req.body)

    return { code: 200, msg: 'create user' }

    /* if (await isUsernameAlreadyTaken(user.username)) res.send({ usernameError: 'Nom d\'utilisateur déjà existant' })
    else if (await isMailAlreadyTaken(user.mail)) res.send({ mailError: 'Mail déjà existant' })
    else await createUser(user).then(userId => res.send({ userId })) */

})
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
        wallet: [
            {
                name: 'euro',
                symbol: 'EUR',
                base: '€',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg',
                currencyAmount: 0
            }
        ],
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