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
    const euro = { symbol: 'EUR', name: 'Euro', icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg' }

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
                <div className="input-container border-bottom">
                    <Select options={userWallet} type="fromCrypto" className="border-bottom" />
                    <input type="number" placeholder="0" />
                </div>

                <div className="equal-sign-container">
                    <span>=</span>
                </div>

                <div className="input-container">
                    <div className="selected">
                        <img src={euro.icon} alt={euro.name + '-icon'} />
                        <div className="crypto-name">
                            <p className="name">{euro.name.charAt(0).toUpperCase() + euro.name.slice(1)}</p>
                            <p className="symbol">{euro.symbol}</p>
                        </div>
                    </div>
                    <input type="number" placeholder="0" />
                </div>

                <div className="input-container border-top">
                    <Select options={cryptoList} type="toCrypto" />
                    <input type="number" placeholder="0" />
                </div>
                <button>Confirmer</button>
            </form>
        </div>
    )
}
