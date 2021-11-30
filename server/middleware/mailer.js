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
    transporter.sendMail(options, (err, info) => console.log(err ? err : info.envelope))
}
const changePasswordConfirmation = (user) => {
    const options = {
        from: process.env.MAIL_USER,
        to: user.mail,
        subject: 'Toc toc',
        html: '<p>Changed your password</p>'
    }
    transporter.sendMail(options, (err, info) => console.log(err ? err : info.envelope))
}
const registerConfirmation = (user) => {
    const options = {
        from: process.env.MAIL_USER,
        to: user.mail,
        subject: 'Toc toc',
        html: '<p>You are registered</p>'
    }
    transporter.sendMail(options, (err, info) => console.log(err ? err : info.envelope))
}

module.exports = { resetPassword, changePasswordConfirmation, registerConfirmation }
