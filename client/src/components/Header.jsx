import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router"

import { BACKEND_URL as URL } from '../constants/constants';

function Header(props) {
  const [user, setUser] = useState('')
  const [cryptoPrices, setCryptoPrices] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('from header :',URL);
      if (props.location.pathname !== '/login') {
        fetch(`${URL}/api/auth`, { headers: setAuthHeaders() })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                (async() => {
                    const userId = localStorage.getItem('userId')
                    await getUser(userId)
                    await getCryptoPrices()
                    setIsLoading(false)
                })()
            }
        })
      }
  }, [props.location.pathname])

  async function getUser(userId) {
      await fetch(`${URL}/api/users/${userId}`, { headers: setAuthHeaders() })
      .then(res => res.json())
      .then(data => setUser(data))
  }
  async function getCryptoPrices() {
      await fetch(`${URL}/api/crypto/prices`)
      .then(res => res.json())
      .then(data => setCryptoPrices(data))
  }

  if (isLoading) { return <div className="loading-container"></div> }

  if (props.location.pathname !== '/login') {
    return (
        <div className="header">
            <div className="profile-img-container">
            <img src={user.profilImg} alt="profile-img" />
            </div>
            <div className="total-balance-container">
                <p>Solde total</p>
                <p>{getWalletAmount(user.wallet, cryptoPrices)}€</p>
            </div>
        </div>
    )
  } else { return <div></div> }
}

function getWalletAmount(wallet, cryptoPrices) {
  let amount = 0
  wallet.forEach(crypto => {
    if (crypto.symbol !== 'EUR') amount += getCurrencyPrice(cryptoPrices, crypto.symbol, crypto.cryptoAmount)
    else amount += crypto.cryptoAmount
  })
  return amount.toString().substring(0,6)
}
function getCurrencyPrice(cryptoPrices, base, cryptoAmount) {
  let toReturn
  cryptoPrices.forEach(crypto => {
    if (crypto.base === base) toReturn = crypto.amount * cryptoAmount
  })
  return toReturn
}
function setAuthHeaders() {
    const token = localStorage.getItem('accessToken')
    return {'authorization': `Bearer ${token ? token : ''}`}
}

export default withRouter(Header)
