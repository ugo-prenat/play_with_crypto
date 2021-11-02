const express = require('express')
const router = express.Router()
const db = require('../database/export.database')
const Users = db.models.users

/* router.post('/sell', async (req, res) => {
    foundError = false

    // Get request data
    const reqData = JSON.parse(req.body)
    
    // Get user's wallet
    const user = await Users.find({ id: reqData.userId }).then(users => { return users[0]})
    let userWallet = user.wallet

    // DEBIT
    // Check if the "from" object is a crypto or a currency, then debit it
    let from
    if (reqData.from.type === 'crypto') from = getFromCrypto(userWallet, reqData.from.name.toLowerCase())
    else {
        from = userWallet[0]
        from.walletIndex = 0
    }

    // Check if user has enough crypto/currency
    if (from.cryptoAmount >= reqData.from.cryptoAmount || from.currencyAmount >= reqData.from.currencyAmount) {
        if (reqData.from.type === 'crypto') userWallet[from.walletIndex] = debitWallet(userWallet[from.walletIndex], reqData.from.cryptoAmount, reqData.from.currencyAmount)
        else userWallet[from.walletIndex] = debitWallet(userWallet[from.walletIndex], null, reqData.from.currencyAmount)
    } else {
        foundError = true
        res.send({ error: `Vous avez ${from.cryptoAmount ? from.cryptoAmount + ' ' + from.symbol : from.currencyAmount + from.symbol} dans votre protefeuille` })
    }

    // CREDIT
    // Check if the "to" object is a crypto or a currency, then credit it
    if (!foundError) {
        let to
        if (reqData.to.type === 'crypto') to = getToCrypto(userWallet, reqData.to.name.toLowerCase())
        else {
            to = userWallet[0]
            to.walletIndex = 0
        }
        if (reqData.to.type === 'crypto') userWallet[to.walletIndex] = creditWallet(userWallet[to.walletIndex], reqData.to.cryptoAmount, reqData.to.currencyAmount)
        else userWallet[to.walletIndex] = creditWallet(userWallet[to.walletIndex], null, reqData.to.currencyAmount)
    
        await user.save().then(res.send({ success: 'Votre transaction a été effectuée' }))
    }
    console.log(foundError ? 'Unable to do the transaction' : 'Transaction done');
}) */
function creditWallet(walletElement, cryptoAmount, currencyAmount) {
    if (cryptoAmount) walletElement.cryptoAmount += cryptoAmount
    walletElement.currencyAmount += currencyAmount
    
    return walletElement
}
function debitWallet(walletElement, cryptoAmount, currencyAmount) {
    if (cryptoAmount) walletElement.cryptoAmount -= cryptoAmount
    walletElement.currencyAmount -= currencyAmount

    return walletElement
}
function getToCrypto(userWallet, cryptoName) {
    for (let i = 0; i < userWallet.length; i++) {
        const crypto = userWallet[i];
        if (crypto.name === cryptoName) {
            crypto.walletIndex = i
            return crypto
        }
    }
}
function getFromCrypto(userWallet, cryptoName) {
    for (let i = 0; i < userWallet.length; i++) {
        const crypto = userWallet[i];
        if (crypto.name === cryptoName) {
            crypto.walletIndex = i
            return crypto
        }
    }
}

module.exports = router