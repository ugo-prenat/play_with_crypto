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
                type: 'crypto', // crypto or currency
                name: 'Bitcoin',
                cryptoAmount: 9,
                currencyAmount: 9,
            },
            to: {
                type: 'currency', // crypto or currency
                name: 'Euro',
                cryptoAmount: 9,
                currencyAmount: 9
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
    else if (x === 'truc') setSellData()

    useEffect(() => {
    }, [])

    return (
        <div>
            <form className="buy-and-sell-form">
                <div className="first-input-containers">
                    <div className="input-container">
                        <input type="text" placeholder="0" />
                        <select>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}
