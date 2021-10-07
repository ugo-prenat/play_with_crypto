import React from 'react'
import Async from "react-async"

import '../../styles/cryptoList.css'

import CryptoCard from './CryptoCard'

export default function CryptoList() {

    const cryptoList = async () => {
        const cryptoList = await (await fetch('/api/crypto/prices')).json()
        return cryptoList
    }

    return (
        <div>
            <Async promiseFn={cryptoList}>
                {({ data, err, isLoading }) => {
                    if (isLoading) return "Loading..."
                    if (err) return err
                    
                    if (data) {
                        return (
                            <div>
                                {data.map(crypto => (
                                    <CryptoCard key={crypto.base} data={crypto} />
                                ))}
                            </div>
                        )
                    }
                }}
            </Async>
        </div>
    )
}
