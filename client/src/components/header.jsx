import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router"
import { AUTH_HEADERS } from '../authHeaders'


function Header(props) {
  const [user, setUser] = useState('')
  const [cryptoPrices, setCryptoPrices] = useState()
  const [showHeader, setShowHeader] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    fetch('/api/auth', { headers: AUTH_HEADERS })
    .then(res => res.json())
    .then(res => {
        if (res.code !== 200) setShowHeader(false)
        else {
            (async() => {
                await getUser()
                await getCryptoPrices()
                setIsLoading(false)
            })()
        }
    })
  }, [userId])

  async function getUser() {
      await fetch(`/api/users/${userId}`, { headers: AUTH_HEADERS })
      .then(res => res.json())
      .then(data => setUser(data))
  }
  async function getCryptoPrices() {
      await fetch('/api/crypto/prices')
      .then(res => res.json())
      .then(data => setCryptoPrices(data))
  }

  if (isLoading) { return <div>Chargement...</div> }

  if (props.location.pathname !== '/login') {
    return (
        <div className="header">
            <div className="profile-img-container">
            <img src={user.profilImg} alt="profile-img" />
            </div>
            <p>Portefeuille : {getWalletAmount(user.wallet, cryptoPrices)}€</p>
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

export default withRouter(Header)