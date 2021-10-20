import React, { useEffect, useState } from 'react'
import Select from './Select';

async function setBuyData() {
    await fetch('/api/users/buy', {
        method: 'POST',
        body: JSON.stringify({
            cryptoName: 'Dogecoin',
            cryptoAmount: 10,
            currencyAmount: 10,
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
    const [ userWallet, setUserWallet ] = useState([])
    const [cryptoList, setCryptoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const euro = { symbol: 'EUR', icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg' }

    async function getUserWallet() {
        const userId = 1

        await fetch(`/api/users/${userId}/wallet`)
        .then(res => res.json())
        .then(userWallet => setUserWallet(userWallet))
    }
    async function getCryptoList() {
        await fetch('/api/crypto/list')
        .then(res => res.json())
        .then(cryptoList => setCryptoList(cryptoList))
    }
    
    useEffect(async () => {
        await getUserWallet()
        await getCryptoList()
        setIsLoading(false)
    }, [])
    
    if (isLoading) { return <div className="loading-container"><p>Chargement...</p></div> }

    return (
        <div>
            <form className="buy-and-sell-form">

                <div className="from-input-container">
                    <div className="input-container">
                        <input type="number" placeholder="0" />
                        <span className="vertical-bar"></span>
                        <Select options={userWallet} />
                    </div>

                    <p className="equal-sign">=</p>

                    <div className="input-container">
                        <input type="number" placeholder="0" />
                        <span className="vertical-bar"></span>
                        <div className="currency-input-container">
                            <img src={euro.icon} alt={euro.symbol + '-icon'} />
                            <p>{euro.symbol}</p>
                        </div>
                    </div>
                </div>

                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path></svg>

                <div className="to-input-container">
                    <div className="input-container">
                        <input type="number" placeholder="0" />
                        <span className="vertical-bar"></span>
                        <Select options={cryptoList} type="cryptoList" />
                    </div>
                </div>
            </form>
        </div>
    )
}
