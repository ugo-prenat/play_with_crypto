const rp = require('request-promise')
const Crypto = require('../database/export.database').models.crypto
const cryptoList = require('./currencies.data')

API_PATH = 'https://api.coinbase.com/v2/prices'

const currencyList = [
    { name: 'EUR', symbol: '€' },
    { name: 'USD', symbol: '$' }
]

async function pricesLoop() {
    getPrices().then(prices => storePricesToDB(prices))

    setInterval(() => {
        getPrices().then(prices => storePricesToDB(prices))
    }, 10000)
}

async function getPrices() {
    const currency = currencyList[0]
    output = []

    for (let i = 0; i < cryptoList.length; i++) {
        const crypto = cryptoList[i];
        url = `${API_PATH}/${crypto.symbol}-${currency.name}/spot`

        await rp({ url, json: true })
        .then(async result => {
            currencyObj = result.data
            currencyObj.currency == 'EUR' ? currencyObj.symbol = '€' : '$'
            currencyObj.name = crypto.name
            currencyObj.icon = crypto.icon
            output.push(currencyObj)
        })
        .catch(err => console.log(err))
    }
    return output
}

async function storePricesToDB(newPrices) {
    Crypto.findById('6151823848fe492bdae20310')
    .then(pricesModel => {
        pricesModel.prices = newPrices
        pricesModel.save()
    })
}

module.exports = pricesLoop()