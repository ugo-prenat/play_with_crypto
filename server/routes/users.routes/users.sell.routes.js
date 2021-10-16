const express = require('express')
const router = express.Router()
const db = require('../../database/export.database')
const Users = db.models.users

router.post('/sell', async (req, res) => {
    // Get request data
    const reqData = JSON.parse(req.body)
    
    // Get user's wallet
    const user = await Users.find({ id: reqData.userId }).then(users => { return users[0]})
    let userWallet = user.wallet.cryptoList

    // Debit the "from" crypto
    const fromCrypto = getFromCrypto(userWallet, reqData.from.cryptoName.toLowerCase())
    // Check if user has enough crypto
    if (fromCrypto.cryptoAmount >= reqData.from.cryptoAmount) {
        console.log('Debtting crypto...');
    } else {
        res.send({ error: `Vous avez ${fromCrypto.cryptoAmount} ${fromCrypto.symbol} dans votre protefeuille` })
    }

    // Credit the "to" crypto

})
function getFromCrypto(userWallet, fromCryptoName) {
    for (let i = 0; i < userWallet.length; i++) {
        const crypto = userWallet[i];
        if (crypto.name === fromCryptoName) {
            return crypto
        }
    }
}

module.exports = router