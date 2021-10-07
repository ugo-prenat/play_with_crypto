import React from 'react'

export default function CryptoCard(props) {
    const crypto = props.data

    return (
        <div className="crypto-card">
            <div className="crypto-icon-name">
                <img src={crypto.icon} alt={crypto.base + '-icon'} />
                <div>
                    <p className="crypto-name">{crypto.name}</p>
                    <p className="crypto-base">{crypto.base}</p>
                </div>
            </div>
            <p className="crypto-amount">{crypto.amount.substring(0, 8) + crypto.symbol}</p>
        </div>
    )
}
