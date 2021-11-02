import React, { useEffect, useState } from 'react'
import CryptoListSelect from './CryptoListSelect';
import WalletSelect from './WalletSelect';

export default function BuyAndSellForm() {
    const [ userWallet, setUserWallet ] = useState([])
    const [cryptoList, setCryptoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fromCryptoAmount, setFromCryptoAmount] = useState('')
    const [fromCrypto, setFromCrypto] = useState('')

    const [toCryptoAmount, setToCryptoAmount] = useState('')
    const [toCrypto, setToCrypto] = useState('')

    const [currencyAmount, setCurrencyAmount] = useState('')

    const euro = { symbol: 'EUR', name: 'Euro', icon: 'https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg' }

    const userId = 1

    async function getUserWallet() {
        await fetch(`/api/users/wallet/${userId}`)
        .then(res => res.json())
        .then(userWallet => {
            setUserWallet(userWallet)
            setFromCrypto(userWallet.length > 1 ? userWallet[1].symbol : userWallet[0].symbol)
        })
    }
    async function cryptoPricesLoop() {
        // Every 10 seconds, get the new prices
        const interval = setInterval(() => {
            fetch('/api/crypto/prices')
            .then(response => response.json())
            .then(data => setCryptoList(data))
        }, 10000)
        return () => clearInterval(interval)
    }
    
    useEffect(async () => {
        await getUserWallet()

        // Get the crypto prices
        await fetch('/api/crypto/prices')
        .then(response => response.json())
        .then(data => {
            setCryptoList(data)
            setToCrypto(data[1].base)
            setIsLoading(false)
        })

        // Function who get the new prices every 10 seconds
        cryptoPricesLoop()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        const data = {
            from: {
                symbol: fromCrypto,
                currencyAmount: parseFloat(currencyAmount),
                cryptoAmount: parseFloat(fromCryptoAmount)
            },
            to : {
                symbol: toCrypto,
                currencyAmount: parseFloat(currencyAmount),
                cryptoAmount: parseFloat(toCryptoAmount)
            }
        }
        await fetch(`/api/users/wallet/${userId}`, { method: 'POST', body: JSON.stringify(data)})
        .then(res => res.json())
        .then(result => {
            if (result.error) console.log(result.error)
            else console.log(result.success);
        })

    }
    const handleFromCryptoAmount = e => {
        const newAmount = e.target.value
        setFromCryptoAmount(newAmount)
        
        const fromCryptoPrice = getCryptoPrice(fromCrypto, cryptoList)
        const toCryptoPrice = getCryptoPrice(toCrypto, cryptoList)

        if (fromCrypto !== 'EUR') {
            const newCurrecnyAmount = newAmount * fromCryptoPrice

            setCurrencyAmount(newCurrecnyAmount)
            setToCryptoAmount(newCurrecnyAmount / toCryptoPrice)
        } else {
            setCurrencyAmount(newAmount)
            setToCryptoAmount(newAmount / toCryptoPrice)
        }
    }
    const handleCurrencyAmount = e => {
        const newAmount = e.target.value
        setCurrencyAmount(newAmount)

        const fromCryptoPrice = getCryptoPrice(fromCrypto, cryptoList)
        const toCryptoPrice = getCryptoPrice(toCrypto, cryptoList)

        if (fromCrypto !== 'EUR') {
            setFromCryptoAmount(newAmount / fromCryptoPrice)
            setToCryptoAmount(newAmount / toCryptoPrice)
        } else {
            setFromCryptoAmount(newAmount)
            setToCryptoAmount(newAmount / toCryptoPrice)
        }
    }
    const handleToCryptoAmount = e => {
        const newAmount = e.target.value
        setToCryptoAmount(newAmount)

        const fromCryptoPrice = getCryptoPrice(fromCrypto, cryptoList)
        const toCryptoPrice = getCryptoPrice(toCrypto, cryptoList)

        const newCurrecnyAmount = newAmount * toCryptoPrice

        if (fromCrypto !== 'EUR') {
            setCurrencyAmount(newCurrecnyAmount)
            setFromCryptoAmount(newCurrecnyAmount / fromCryptoPrice)
        } else {
            setCurrencyAmount(newCurrecnyAmount)
            setFromCryptoAmount(newCurrecnyAmount)
        }
    }
    
    if (isLoading) { return <div className="loading-container"><p>Chargement...</p></div> }

    return (
        <div>
            <form className="buy-and-sell-form" onSubmit={handleSubmit}>
                <div className="input-container border-bottom">
                    <WalletSelect newSelect={data => setFromCrypto(data)} options={userWallet} className="border-bottom" />
                    <input type="number" step="0.0000000001" min="0" value={fromCryptoAmount.toString().substring(0, 12)} onChange={handleFromCryptoAmount} placeholder="0" />
                </div>

                <div className="equal-sign-container sign-container"><span>=</span></div>

                <div className="input-container">
                    <div className="selected">
                        <img src={euro.icon} alt={euro.name + '-icon'} />
                        <div className="crypto-name">
                            <p className="name">{euro.name.charAt(0).toUpperCase() + euro.name.slice(1)}</p>
                            <p className="symbol">{euro.symbol}</p>
                        </div>
                    </div>
                    <input type="number" step="0.0000000001" min="0" value={currencyAmount.toString().substring(0, 12)} onChange={handleCurrencyAmount} placeholder="0" />
                </div>

                <div className="down-arrow-container sign-container">
                    <span><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path></svg></span>
                </div>
                
                <div className="input-container to-input-container">
                    <CryptoListSelect newSelect={data => setToCrypto(data)} options={cryptoList} />
                    <input type="number" step="0.0000000001" min="0" value={toCryptoAmount.toString().substring(0, 12)} onChange={handleToCryptoAmount} placeholder="0" />
                </div>
                <button>Confirmer</button>
            </form>
        </div>
    )
}

function getCryptoPrice(symbol, cryptoList) {
    let toReturn

    cryptoList.forEach(crypto => {
        if (crypto.base === symbol) toReturn = crypto.amount
    })
    return toReturn
}

/* async function setBuyData() {
    await fetch('/api/users/buy', {
        method: 'POST',
        body: JSON.stringify({
            cryptoName: 'Dogecoin',
            cryptoAmount: 10,
            currencyAmount: 10,
            userId: 1
        })
    })
} */

async function setSellData(userId, data) {
    await fetch(`/api/users/wallet/${userId}`, {
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