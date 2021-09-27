async function getPrices() {
    let toReturn

    await fetch('/api/crypto/prices')
    .then(response => response.json())
    .then(result => toReturn = result)

    return toReturn
}