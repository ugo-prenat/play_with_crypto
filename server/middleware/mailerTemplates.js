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
    changePasswordConfirmation: () => {
        return `
            <div style="text-align: center;font-family: 'poppins', sans-serif;">
                <p>Confirmation de changement de mot de passe</p>
            </div>
        `
    },
    registerConfirmation: () => {
        return `
            <div style="text-align: center;font-family: 'poppins', sans-serif;">
                <p>Confirmer votre addresse mail lo</p>
            </div>
        `
    }
}