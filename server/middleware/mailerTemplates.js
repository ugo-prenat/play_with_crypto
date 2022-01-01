require('dotenv').config()

module.exports = {
    resetPassword: accessToken => {
        return `
            <div style="text-align: center;font-family: 'poppins', sans-serif;">
                <h1 style="font-weight: 600;">Oubli du mot de passe</h1>

                <p style="margin-bottom:0;margin-top: 20px;">Vous avez fait une demande de réinitialisation de votre mot de passe.</p>
                <p style="margin-top:0;">Pour définir un nouveau mot de passe, merci de cliquer sur le bouton ci-dessous :</p>

                <a href="${process.env.APP_DOMAIN}/password/reset/${accessToken}" style="font-family: 'poppins', sans-serif;font-size:15px;border-radius: 5px;display: inline-block;padding: 10px 15px;background-color: rgb(251, 174, 60);color: rgb(21, 22, 23);text-decoration:none;margin-top: 25px;font-weight: 500;">
                    Réinitialiser mon mot de passe
                </a>
            </div>
        `
    },
    changePasswordConfirmation: accessToken => {
        return `
            <div style="text-align: center;font-family: 'poppins', sans-serif;">
                <h1 style="font-weight: 600;">Confirmation de modification de mot de passe</h1>

                <p style="margin-bottom:0;margin-top: 20px;">Le mot de passe de votre compte Play With Crypto a changé.</p>
                <p style="margin-top:0;">Si vous n'êtes pas l'auteur de ce changement, merci de réinitialiser votre mot de passe en cliquant sur le lien ci-dessous :</p>

                <a href="${process.env.APP_DOMAIN}/password/reset/${accessToken}" style="font-family: 'poppins', sans-serif;">
                    Réinitialiser mon mot de passe
                </a>
            </div>
        `
    },
    registerConfirmation: () => {
        return `
            <div style="text-align: center;font-family: 'poppins', sans-serif;">
                <h1 style="font-weight: 600;">Bienvenue chez Play With Crypto !</h1>

                <p style="margin-bottom:0;margin-top: 20px;">Merci d'avoir créé un compte sur notre plateforme</p>
                <p style="margin-top:0;">Vous trouverez ci-dessous un bouton pour vous connecter :</p>

                <a href="${process.env.APP_DOMAIN}" style="font-family: 'poppins', sans-serif;font-size:15px;border-radius: 5px;display: inline-block;padding: 10px 15px;background-color: rgb(251, 174, 60);color: rgb(21, 22, 23);text-decoration:none;margin-top: 25px;font-weight: 500;">
                    Accéder au site
                </a>
            </div>
        `
    },
    issueReport: (message, recipient) => {
        return `
            <div style="text-align: center;font-family: 'poppins', sans-serif;">
                <p>Oui le bug</p>
                <p>${message}</p>

                <br>
                <p>id: ${recipient.id}</p>
                <p>username: ${recipient.username}</p>
                <p>Mail : ${recipient.mail}</p>
            </div>
        `
    }
}