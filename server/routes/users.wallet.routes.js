const express = require('express')
const router = express.Router()
const CRYPTO_LIST = require('../api/currencies.data')
const db = require('../database/export.database')
const Users = db.models.users


router.get('/', (req, res) => {
    res.send('ouais')
})

router.get('/:id', (req, res) => {
    // Get the wallet if the specified user

    Users.findOne({ id: req.params.id })
    .then(user => res.send(user.wallet))
})
router.post('/:id', async (req, res) => {
    // Make a transaction between 2 crypto in the user wallet

    foundError = false

    // Get request data
    const reqData = JSON.parse(req.body)
    
    // Get user's wallet
    const user = await Users.findOne({ id: req.params.id }).then(users => { return users})
    let userWallet = user.wallet

    // DEBIT
    from = getFromCrypto(userWallet, reqData.from.symbol)

    // Check if user has enough crypto in his wallet
    if (from.cryptoAmount >= reqData.from.cryptoAmount || from.currencyAmount >= reqData.from.currencyAmount) {
        userWallet[from.walletIndex] = debitWallet(userWallet[from.walletIndex], reqData.from.cryptoAmount, reqData.from.currencyAmount)
    } else {
        foundError = true
        res.send({ error: `Vous avez ${from.cryptoAmount ? from.cryptoAmount + ' ' + from.symbol : from.currencyAmount + from.symbol} dans votre protefeuille` })
    }

    // CREDIT
    if (!foundError) {

        if (isCryptoAlreadyInWallet(userWallet, reqData.to.symbol)) {
            // Credit the wallet
            toIndex = getToCryptoIndex(userWallet, reqData.to.symbol)
            userWallet[toIndex] = creditWallet(userWallet[toIndex], reqData.to.cryptoAmount, reqData.to.currencyAmount)
        } else {
            // Create the new crypto in wallet and credit it    
            newCrypto = createNewCrypto(reqData.to)
            userWallet.push(newCrypto)
        }
        await user.save().then(res.send({ success: 'Votre transaction a été effectuée' }))
    }
    console.log(foundError ? 'Unable to do the transaction' : 'Transaction done');
})


function creditWallet(walletElement, cryptoAmount, currencyAmount) {
    walletElement.cryptoAmount += cryptoAmount
    walletElement.currencyAmount += currencyAmount
    
    return walletElement
}
function debitWallet(walletElement, cryptoAmount, currencyAmount) {
    walletElement.cryptoAmount -= cryptoAmount
    walletElement.currencyAmount -= currencyAmount

    return walletElement
}
function getToCryptoIndex(userWallet, cryptoSymbol) {
    for (let i = 0; i < userWallet.length; i++) {
        const crypto = userWallet[i];
        if (crypto.symbol === cryptoSymbol) {
            return i
        }
    }
}
function getFromCrypto(userWallet, cryptoSymbol) {
    for (let i = 0; i < userWallet.length; i++) {
        const crypto = userWallet[i];
        if (crypto.symbol === cryptoSymbol) {
            crypto.walletIndex = i
            return crypto
        }
    }
}
function isCryptoAlreadyInWallet(userWallet, cryptoSymbol) {
    foundMatch = false

    userWallet.forEach(crypto => {
        if (crypto.symbol === cryptoSymbol) {
            foundMatch = true
        }
    })
    return foundMatch
}
function createNewCrypto(data) {
    // Create a new entry in the wallet
    const crypto = getCryptoFromSymbol(data.symbol)
    
    const newCrypto = {
        name: crypto.name.toLowerCase(),
        symbol: crypto.symbol,
        icon: crypto.icon,
        cryptoAmount: data.cryptoAmount,
        currencyAmount: data.currencyAmount
    }
    return newCrypto
}
function getCryptoFromSymbol(cryptoSymbol) {
    // Get a wanted crypto from the CRYPTO_LIST
    for (let i = 0; i < CRYPTO_LIST.length; i++) {
        const CRYPTO = CRYPTO_LIST[i];
        if (CRYPTO.symbol === cryptoSymbol) {
            return CRYPTO
        }
    }
}

module.exports = router