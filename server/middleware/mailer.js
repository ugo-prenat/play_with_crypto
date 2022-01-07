require('dotenv').config()
const nodemailer = require('nodemailer')

const templates = require('./mailerTemplates')


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASSWORD
    }
})

const resetPassword = (recipientMail, accessToken) => {
    const options = {
        from: process.env.MAIL_USER,
        to: recipientMail,
        subject: 'Mot de passe oublié',
        html: templates.resetPassword(accessToken)
    }
    transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}
const changePasswordConfirmation = (recipientMail, accessToken) => {
    const options = {
        from: process.env.MAIL_USER,
        to: recipientMail,
        subject: 'Votre mot de passe a bien été modifié',
        html: templates.changePasswordConfirmation(accessToken)
    }
    transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}
const registerConfirmation = (recipientMail) => {
    const options = {
        from: process.env.MAIL_USER,
        to: recipientMail,
        subject: 'Bienvenue chez Play With Crypto !',
        html: templates.registerConfirmation()
    }
    transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}

const issueReport = (object, message, recipient, date) => {
    const options = {
        from: process.env.MAIL_USER,
        to: process.env.ADMIN_MAIL,
        subject: '👷  Play With Crypto - Nouveau bug signalé',
        html: templates.issueReport(object, message, recipient, date)
    }
    transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}

const accountCreation = user => {
    const options = {
        from: process.env.MAIL_USER,
        to: process.env.ADMIN_MAIL,
        subject: 'Play With Crypto - Nouveau compte créé',
        html: templates.accountCreation(user)
    }
    transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}

module.exports = { resetPassword, changePasswordConfirmation, registerConfirmation, issueReport, accountCreation }
