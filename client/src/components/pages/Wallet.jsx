import { useEffect, useState } from "react"

import '../../styles/wallet.css'

export default function Wallet() {
    const [wallet, setWallet] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetch(`/api/users/${userId}/wallet`)
        .then(res => res.json())
        .then(data => {
            setWallet(data)
            setIsLoading(false)
        })
    }, [])

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
                            <p className="currency-amount">{crypto.currencyAmount.toString().substring(0, 8)}€</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}