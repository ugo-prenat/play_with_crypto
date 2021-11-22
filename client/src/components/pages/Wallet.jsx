import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { AUTH_HEADERS } from '../../authHeaders'

import '../../styles/wallet.css'

export default function Wallet() {
    const [wallet, setWallet] = useState()
    const [cryptoPrices, setCryptoPrices] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const userId = localStorage.getItem('userId')
    let history = useHistory()

    useEffect(() => {
        fetch('/api/auth', { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(res => {
            if (res.code !== 200) history.push('/login')
            else {
                (async() => {
                    await getUserWallet()
                    await getCryptoPrices()
                    setIsLoading(false)
                })()
            }
        })
    }, [])
    
    async function getUserWallet() {
        await fetch(`/api/users/${userId}/wallet`, { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(data => setWallet(data))
    }
    async function getCryptoPrices() {
        await fetch('/api/crypto/prices')
        .then(res => res.json())
        .then(data => setCryptoPrices(data))
    }
    function getCurrencyPrice(base, cryptoAmount) {
        let toReturn
        cryptoPrices.forEach(crypto => {
            if (crypto.base === base) toReturn = crypto.amount * cryptoAmount
        })
        return toReturn.toString().substring(0,6)
    }

    if (isLoading) { return <div className="loading-container"><p>Chargement du portefeuille...</p></div> }

    return (
        <div className="component wallet-component">
            <div className="crypto-list">
                {wallet.map((crypto, index) => {
                    return <div className="crypto" key={index}>
                        <div className="crypto-data">
                            <img src={crypto.icon} alt={crypto.symbol + '-icon'} />
                            <div className="crypto-name">
                                <p className="name">{crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1)}</p>
                                <p className="symbol">{crypto.symbol}</p>
                            </div>            
                        </div>
                        <div className="prices">
                            <p className="crypto-amount">{crypto.cryptoAmount.toString().substring(0, 8)} {crypto.symbol}</p>
                            {crypto.symbol !== 'EUR' && <p className="currency-amount">{getCurrencyPrice(crypto.symbol, crypto.cryptoAmount)}€</p>}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}