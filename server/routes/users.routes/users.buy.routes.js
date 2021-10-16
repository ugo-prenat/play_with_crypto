const express = require('express')
const router = express.Router()
const CRYPTO_LIST = require('../../api/currencies.data')
const db = require('../../database/export.database')
const Users = db.models.users

router.post('/buy', async (req, res) => {
    // Get request data
    const reqData = JSON.parse(req.body)
    reqData.cryptoName = reqData.cryptoName.toLowerCase()

    // Get user's wallet
    const user = await Users.find({ id: reqData.userId }).then(users => { return users[0]})
    let userWallet = user.wallet

    // If crypto already exists in the wallet, update his amount
    if (await isCryptoAlreadyInWallet(userWallet, reqData.cryptoName)) {
        const newWallet = updateUserWallet(userWallet, reqData)
        userWallet = newWallet
    }
    // If crypto doesn't exist in the wallet, create it
    else {
        const newCrypto = getNewCrypto(reqData)
        userWallet.push(newCrypto)
    }

    updateUserActivity()

    await user.save()
})

function isCryptoAlreadyInWallet(userWallet, cryptoName) {
    foundMatch = false

    for (let i = 0; i < userWallet.length; i++) {
        const crypto = userWallet[i];
        if (crypto.name === cryptoName) {
            foundMatch = true
            break
        }
    }
    return foundMatch
}
function updateUserWallet(userWallet, data) {
    // Search for the crypto in the wallet and update the crypto and currency amount
    userWallet.forEach(crypto => {
        if (crypto.name === data.cryptoName) {
            crypto.cryptoAmount += data.cryptoAmount
            crypto.currencyAmount += data.currencyAmount

            return userWallet
        }
    })
}
function getNewCrypto(data) {
    // Create a new entry in the wallet
    const crypto = getCryptoFromName(data.cryptoName)

    const newCrypto = {
        name: crypto.name.toLowerCase(),
        symbol: crypto.base,
        icon: crypto.icon,
        cryptoAmount: data.cryptoAmount,
        currencyAmount: data.currencyAmount
    }

    return newCrypto
}
function getCryptoFromName(cryptoName) {
    // Get a wanted crypto from the CRYPTO_LIST
    for (let i = 0; i < CRYPTO_LIST.length; i++) {
        const CRYPTO = CRYPTO_LIST[i];
        if (CRYPTO.name.toLowerCase() === cryptoName) {
            return CRYPTO
        }
    }
}
async function updateUserActivity() {
    
}

module.exports = router
