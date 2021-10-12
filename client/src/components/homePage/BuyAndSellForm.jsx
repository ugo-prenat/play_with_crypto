import React, { useEffect } from 'react'

async function setBuyData() {
    await fetch('/api/users/buy', {
        method: 'POST',
        body: JSON.stringify({
            currencyAmount: 100,
            cryptoAmount: 0.00205173,
            cryptoName: 'bitcoin'
        })
    })
}

export default function BuyAndSellForm() {

    useEffect(() => {
        setBuyData()
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
