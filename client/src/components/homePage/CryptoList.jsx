import React, { useEffect } from 'react'
import { useState } from 'react'

import CryptoCard from './CryptoCard'

export default function CryptoList() {
    const [cryptoList, setCryptoList] = useState([])

    useEffect(() => {
        // At load of the page, get prices
        fetch('/api/crypto/prices')
        .then(response => response.json())
        .then(data => setCryptoList(data))
        
        // Every 10 seconds, get the new prices
        const interval = setInterval(() => {
            fetch('/api/crypto/prices')
            .then(response => response.json())
            .then(data => setCryptoList(data))
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    if (cryptoList === []) {
        return (
            <div className="loding-msg">
                <p>Chargement des cryptomonnaies...</p>
            </div>
        )
    } else {
        return (
            <div>
                {cryptoList.map(crypto => (
                    <CryptoCard key={crypto.base} data={crypto} />
                ))}
            </div>
        )
    }
}
