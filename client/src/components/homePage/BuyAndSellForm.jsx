import React, { useEffect } from 'react'

async function setBuyData() {
    await fetch('/api/users/buy', {
        method: 'POST',
        body: JSON.stringify({
            cryptoName: 'Ethereum',
            cryptoAmount: 30,
            currencyAmount: 1300,
            userId: 1
        })
    })
}

async function setSellData() {
    await fetch('/api/users/sell', {
        method: 'POST',
        body: JSON.stringify({
            from: {
                type: 'currency', // crypto or currency
                name: 'euro',
                cryptoAmount: 10,
                currencyAmount: 10,
            },
            to: {
                type: 'crypto', // crypto or currency
                name: 'Bitcoin',
                cryptoAmount: 10,
                currencyAmount: 10
            },
            userId: 1
        })
    })
    .then(res => res.json())
    .then(result => {
        if (result.error) console.log(result.error)
        else console.log(result.success);
    })
}

export default function BuyAndSellForm() {
    const x = false
    if (x === true) setBuyData()

    useEffect(() => {
        setSellData()
    }, [])

    return (
        <div>
            <form className="buy-and-sell-form">
                <div className="input-group">
                    <input type="text" placeholder="crypto" className="input-field" />
                    <select>
                        <option>BTC</option>
                        <option>ETH</option>
                        <option>DOGE</option>
                    </select>
                </div>
            </form>
        </div>
    )
}
