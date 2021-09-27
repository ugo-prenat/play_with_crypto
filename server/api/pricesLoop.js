const rp = require('request-promise')
const Prices = require('../database/export.database').models.prices

API_PATH = 'https://api.coinbase.com/v2/prices'

const cryptoList = [
    'BTC',  'ETH', 'ADA',
    'USDT', 'SOL', 'DOT',
    'DOGE', 'UNI', 'LINK',
    'LTC',  'BAT', 'GRT'
]

const currencyList = [
    { name: 'EUR', symbol: '€' },
    { name: 'USD', symbol: '$' }
]

async function pricesLoop() {
    getPrices().then(prices => storePricesToDB(prices))

    setInterval(() => {
        getPrices().then(prices => storePricesToDB(prices))
    }, 15000)
}

async function getPrices() {
    const currency = currencyList[0]
    output = []

    for (let i = 0; i < cryptoList.length; i++) {
        const crypto = cryptoList[i];
        url = `${API_PATH}/${crypto}-${currency.name}/spot`

        await rp({ url, json: true })
        .then(result => output.push(result.data))
        .catch(err => console.log(err))
    }
    return output
}

async function storePricesToDB(newPrices) {
    Prices.findById('6151823848fe492bdae20310')
    .then(pricesModel => {
        pricesModel.prices = newPrices
        pricesModel.save()
    })
}

module.exports = pricesLoop()