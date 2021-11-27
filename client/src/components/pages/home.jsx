import React from 'react';

import '../../styles/home.css'

import CryptoList from '../homePage/CryptoList'
import BuyAndSellForm from '../homePage/BuyAndSellForm'

export default function Home(props) {
    return (
        <div className="component home-component">
            <div className="crypto-list-container">
                <CryptoList />
            </div>
            <div className="buy-and-sell-form-container">
                <BuyAndSellForm />
            </div>
        </div>
    )
}