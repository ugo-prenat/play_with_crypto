let PRICES
getCryptoPrices()

async function getCryptoPrices() {
    PRICES = await prices()

    setInterval(() => {
        PRICES = prices()
    }, 15000)
}

async function prices() {
    let toReturn

    await fetch('/api/crypto/prices')
    .then(response => response.json())
    .then(result => toReturn = result)

    return toReturn
}