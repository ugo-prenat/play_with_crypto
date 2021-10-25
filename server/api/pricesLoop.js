const rp = require('request-promise')
const cryptoList = require('./currencies.data')

API_PATH = 'https://api.coinbase.com/v2/prices'

const currency = { name: 'EUR', symbol: '€' }

async function getPrices() {
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

async function storePricesToDB(newPrices, cryptoObject) {
    cryptoObject.prices = newPrices
    cryptoObject.save()
}

module.exports = function (cryptoObject) {
    getPrices().then(prices => storePricesToDB(prices, cryptoObject))

    setInterval(() => {
        getPrices().then(prices => storePricesToDB(prices, cryptoObject))
    }, 10000)
}