import React, { useEffect } from 'react'

async function setBuyData() {
    await fetch('/api/users/buy', {
        method: 'POST',
        body: JSON.stringify({
            cryptoName: 'Bitcoin',
            cryptoAmount: 5,
            currencyAmount: 1000,
            userId: 1
        })
    })
}

async function setSellData() {
    await fetch('/api/users/sell', {
        method: 'POST',
        body: JSON.stringify({
            cryptoName: 'Bitcoin',
            cryptoAmount: 5,
            currencyAmount: 1000,
            userId: 1
        })
    })
}

export default function BuyAndSellForm() {

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
