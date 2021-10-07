import React from 'react';

import '../../styles/home.css'

import CryptoList from '../homePage/CryptoList'
import UserCrypto from '../homePage/UserCrypto'

function Home() {
    return (
        <div className="component">
            <div className="crypto-list">
                <CryptoList />
            </div>
            <div className="user-crypto">
                <UserCrypto />
            </div>
        </div>
    )
}

export default Home