import React from 'react';

import '../../styles/home.css'

import CryptoList from '../homePage/CryptoList'
import BuyAndSellForm from '../homePage/BuyAndSellForm'

function Home() {
    return (
        <div className="component">
            <div className="crypto-list">
                <CryptoList />
            </div>
            <div className="buy-and-sell-form-container">
                <BuyAndSellForm />
            </div>
        </div>
    )
}

export default Home