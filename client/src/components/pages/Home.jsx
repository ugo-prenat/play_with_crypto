import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"

import '../../styles/home.css'

import Loading from '../Loading'
import CryptoList from '../homePage/CryptoList'
import BuyAndSellForm from '../homePage/BuyAndSellForm'
import FirstConnectionMsg from '../homePage/FirstConnectionMsg';

import { AUTH_HEADERS } from '../../authHeaders';
import { BACKEND_URL as URL } from '../../constants/constants';

export default function Home() {
    const userId = localStorage.getItem('userId')
    let history = useHistory()

    const [showFirstConnectionMsg, setShowFirstConnectionMsg] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if we need to display the first connection msg
        const storageMsg = localStorage.getItem('firstConnectionMsg')

        if (storageMsg === null) setFirstConnectionMsg()
        else if (storageMsg === 'true') {
            setShowFirstConnectionMsg(true)
            setIsLoading(false)
        } else if (storageMsg === 'false') {
            setShowFirstConnectionMsg(false)
            setIsLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    const setFirstConnectionMsg = () => {
        // Get the user to see if we need to display the first connection msg
        console.log('from home', URL);
        fetch(`${URL}/api/users/${userId}`, { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(user => {
            if (user.code) history.push('/login')
            else if (user.showFirstConnectionMsg) {
                setShowFirstConnectionMsg(true)
                localStorage.setItem('firstConnectionMsg', true)
            }
            else localStorage.setItem('firstConnectionMsg', false)
            
            setIsLoading(false)
        })
    }

    const hideFirstConnectionMsg = () => {
        setShowFirstConnectionMsg(false)

        // Update user
        fetch(`${URL}/api/users/${userId}`, {
            method: 'PATCH',
            headers: AUTH_HEADERS,
            body: JSON.stringify({ showFirstConnectionMsg: false })
        })
        // Update local storage
        localStorage.setItem('firstConnectionMsg', false)
    }

    if (isLoading) { return <div className="home-loading-container loading-container"><Loading /></div> }

    return (
        <div className="component home-component">
            { showFirstConnectionMsg && <FirstConnectionMsg hideMsg={hideFirstConnectionMsg} /> }

            <div className="crypto-list-container">
                <CryptoList />
            </div>
            <div className="buy-and-sell-form-container">
                <BuyAndSellForm />
            </div>
        </div>
    )
}
