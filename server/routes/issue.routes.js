const express = require('express')
const router = express.Router()

const authenticateToken = require('../middleware/authenticateToken')
const mailer = require('../middleware/mailer')


router.post('/', authenticateToken, (req, res) => {
    // Send an email to report an issue
    const data = JSON.parse(req.body)
    const user = req.user

    mailer.issueReport(data.title, data.message, user)

    res.status(200).send({ code: 200, msg: 'Bug signalé' })
})

module.exports = router