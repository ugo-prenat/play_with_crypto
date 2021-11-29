require('dotenv').config()
const nodemailer = require('nodemailer')



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
        html: `<a href="${process.env.APP_DOMAIN}/password/reset/${accessToken}">Reset your password</p>`
    }
    transporter.sendMail(options, function (err, info) {
        if(err) console.log(err)
        else console.log('Email sent');
    })
}
const changePasswordConfirmation = (user) => {
    const options = {
        from: process.env.MAIL_USER,
        to: user.mail,
        subject: 'Toc toc',
        html: '<p>Changed your password</p>'
    }
    transporter.sendMail(options, function (err, info) {
        if(err) console.log(err)
        else console.log('Email sent');
    })
}
const registerConfirmation = (user) => {
    const options = {
        from: process.env.MAIL_USER,
        to: user.mail,
        subject: 'Toc toc',
        html: '<p>You are registered</p>'
    }
    transporter.sendMail(options, function (err, info) {
        if(err) console.log(err)
        else console.log('Email sent');
    })
}

module.exports = { resetPassword, changePasswordConfirmation, registerConfirmation }
