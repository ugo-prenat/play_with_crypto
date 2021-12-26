import React, { useEffect } from 'react'
import { useState } from 'react'

import CryptoCard from './CryptoCard'

import { BACKEND_URL as URL } from '../../constants/constants';

export default function CryptoList() {
    const [cryptoList, setCryptoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // At load of the page, get prices
        fetch(`${URL}/api/crypto/prices`)
        .then(response => response.json())
        .then(data => {
            setCryptoList(data)
            setIsLoading(false)
        })
        
        // Every 10 seconds, get the new prices
        const interval = setInterval(() => {
            fetch(`${URL}/api/crypto/prices`)
            .then(response => response.json())
            .then(data => setCryptoList(data))
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    if (isLoading) { return <div className="loading-container"><p>Chargement des cryptomonnaies...</p></div> }
    
    return (
        <div className="crypto-list">
            {cryptoList.map(crypto => (
                <CryptoCard key={crypto.base} data={crypto} />
            ))}
        </div>
    )
}
