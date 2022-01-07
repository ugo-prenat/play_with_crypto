import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router"

import { BACKEND_URL as URL, APP_DOMAIN } from '../constants/constants';

function Header(props) {
  const [user, setUser] = useState('')
  const [cryptoPrices, setCryptoPrices] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isProdVersion, setIsProdVersion] = useState(false)


  useEffect(() => {
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
      // Check if the user is on the dev version of the website
      const hostname = window.location.hostname
      if (hostname === `dev.${APP_DOMAIN}`) setIsProdVersion(true)

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

            <div className="website-version">
                { isProdVersion && <p>DEV</p>}
            </div>

            <div className='profil-data'>
                <div className="total-balance-container">
                    <p>Solde total</p>
                    <p>{getWalletAmount(user.wallet, cryptoPrices)}€</p>
                </div>
                <div className="profile-img-container">
                    <a href='/settings'>
                        <img src={user.profilImg} alt="profile-img" />
                    </a>
                </div>
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
