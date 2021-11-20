import React from 'react'

export default function ActivityCard(props) {
    const activity = props.data
    return (
        <div className="activity-card">
            <div className="from">
                <img src={activity.from.icon} alt={activity.from.symbol + '-icon'} />
                <div className="price">
                    <p>{activity.from.cryptoAmount.toString().substring(0, 6)} {activity.from.symbol}</p>
                    {activity.from.symbol !== 'EUR' &&
                        <p className="currency-price">{activity.from.currencyAmount.toString().substring(0, 6)}€</p>
                    }
                </div>
            </div>

            <p className="arrow"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.75 6.75L19.25 12L13.75 17.25"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 12H4.75"></path></svg></p>
            
            <div className="to">
                <img src={activity.to.icon} alt={activity.to.symbol + '-icon'} />
                <p>{activity.to.cryptoAmount.toString().substring(0, 6)} {activity.to.symbol}</p>
            </div>
        </div>
    )
}
