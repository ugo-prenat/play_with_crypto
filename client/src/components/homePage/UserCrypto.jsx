import React, { useEffect } from 'react'
import { useState } from 'react'

import CryptoCard from './CryptoCard'

export default function UserCrypto() {
    const userId = 15
    const [userActivity, setUserActivity] = useState([])

    useEffect(() => {
        fetch(`/api/users/${userId}/wallet`)
            .then(response => response.json())
            .then(activity => setUserActivity(activity))
    }, [])

    if (userActivity === []) {
        return (
            <div className="loding-msg">
                <p>Chargement du portefeuille...</p>
            </div>
        )
    } else {
        return (
            <div>
                {userActivity.map(crypto => (
                    <CryptoCard key={crypto.base} data={crypto} />
                ))}
            </div>
        )
    }
}
