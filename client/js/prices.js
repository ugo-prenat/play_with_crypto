getCryptoPrices().then(result => console.log(result))

setInterval(() => {
    getCryptoPrices().then(result => console.log(result))
}, 15000)

async function getCryptoPrices() {
    await fetch('/api/crypto/prices')
    .then(response => response.json())
    .then(result => toReturn = result)

    return toReturn
}