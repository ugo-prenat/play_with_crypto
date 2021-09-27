const waitForPRICES = new Promise((resolve, reject) => {
    // Wait for the constant variable PRICES to be defined
    const interval = setInterval(() => {
        if (PRICES != undefined) {
            clearInterval(interval)
            resolve()
        }
    }, 10)
})
waitForPRICES.then(() => {
    // When the constant variable PRICES has been found, display it
    displayCurrencies()
})

async function displayCurrencies() {
    const listElement = document.querySelector('.currencies-list')
    
    PRICES.forEach(currency => {
        listElement.insertAdjacentHTML('beforeend', `
            <div class="currency">
                <p>${currency.base} at ${currency.amount}</p>
                <p class="buy-btn">Buy</p>
                <p class="sell-btn">Sell</p>
            </div>
        `)
    })
}
