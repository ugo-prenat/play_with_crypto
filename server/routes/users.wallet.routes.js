const express = require('express')
const router = express.Router()

const CRYPTO_LIST = require('../api/currencies.data')
const authenticateToken = require('../middleware/authenticateToken')

const db = require('../database/export.database')
const Users = db.models.users
const Cryptos = db.models.crypto

const euro = { symbol: 'EUR', name: 'Euro', icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg' }

router.post('/:id',authenticateToken, async (req, res) => {
    // Make a transaction between 2 crypto in the user wallet
    let foundError = false

    // Get request data
    const reqData = JSON.parse(req.body)
    
    // Get user's wallet
    const user = await Users.findOne({ id: req.params.id }).then(users => { return users})
    let userWallet = user.wallet

    // DEBIT
    from = getFromCrypto(userWallet, reqData.from.symbol)

    // Check if user has enough crypto in his wallet
    if (from.cryptoAmount >= reqData.from.cryptoAmount) {
        userWallet[from.walletIndex] = debitWallet(userWallet[from.walletIndex], reqData.from.cryptoAmount)

        // If the crypto price is below 0.001€, delete it from the wallet
        const cryptoPrice = await getCryptoPrice(userWallet[from.walletIndex])

        if (cryptoPrice < 0.001) userWallet.splice(from.walletIndex, 1)
    } else {
        foundError = true
        res.send({ code: 400, msg: `Vous avez ${from.cryptoAmount.toString().substring(0,8)} ${from.symbol} dans votre portefeuille` })
    }

    // CREDIT
    if (!foundError) {
        if (isCryptoAlreadyInWallet(userWallet, reqData.to.symbol)) {
            // Credit the wallet
            toIndex = getToCryptoIndex(userWallet, reqData.to.symbol)
            userWallet[toIndex] = creditWallet(userWallet[toIndex], reqData.to.cryptoAmount)
        } else {
            // Create the new crypto in wallet and credit it    
            newCrypto = createNewCrypto(reqData.to)
            userWallet.push(newCrypto)
        }

        // Update the user's activity
        newActivity = newActivityEntry(reqData)
        
        if (isLastActivityToday(user.activity)) {
            user.activity[user.activity.length - 1].list.push(newActivity)
        } else {
            user.activity.push({
                date: new Date(),
                list: [newActivity]
            })
        }

        await user.save()
        res.send({ code: 200, msg: 'Transaction effectuée' })
    }
})

function creditWallet(walletElement, cryptoAmount) {
    walletElement.cryptoAmount += cryptoAmount
    walletElement.cryptoAmount

    return walletElement
}
function debitWallet(walletElement, cryptoAmount) {
    walletElement.cryptoAmount -= cryptoAmount
    walletElement.cryptoAmount

    return walletElement
}
deleteCryptoFromWallet('618e8abbde26190205f9cd1b')
function deleteCryptoFromWallet(id) {
    
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
function newActivityEntry(data) {
    // Get from and to crypto
    fromCrypto = data.from.symbol === 'EUR' ? euro : getCryptoFromSymbol(data.from.symbol)
    toCrypto = data.to.symbol === 'EUR' ? euro : getCryptoFromSymbol(data.to.symbol)

    // Create the new activity entry
    const newEntry = {
        date: new Date(),
        from: {
            name: fromCrypto.name,
            symbol: fromCrypto.symbol,
            icon: fromCrypto.icon,
            cryptoAmount: data.from.cryptoAmount,
            currencyAmount: data.from.currencyAmount
        },
        to: {
            name: toCrypto.name,
            symbol: toCrypto.symbol,
            icon: toCrypto.icon,
            cryptoAmount: data.to.cryptoAmount,
            currencyAmount: data.to.currencyAmount
        },
    }
    return newEntry
}
function isLastActivityToday(userActivity) {
    if (userActivity.length !== 0) {
        lastActivityDate = userActivity[userActivity.length - 1].date.toDateString()

        if (lastActivityDate === new Date().toDateString()) return true
        else return false
    }
    else return false
}
async function getCryptoPrice(cryptoWallet) {
    // Return the price of a crypto
    const cryptoList = await Cryptos.findById('6151823848fe492bdae20310')
    let toReturn

    cryptoList.prices.forEach(crypto => {
        if (crypto.base === cryptoWallet.symbol) {
            toReturn = crypto.amount * cryptoWallet.cryptoAmount
        } else if (cryptoWallet.symbol === 'EUR') {
            toReturn = cryptoWallet.cryptoAmount
        }
    })
    return toReturn
}

module.exports = router