import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router"
import { Link } from "react-router-dom"


function Header() {
  const [user, setUser] = useState('')
  const [cryptoPrices, setCryptoPrices] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    (async() => {
        await getUserWallet()
        await getCryptoPrices()
    })()
  }, [])

  async function getUserWallet() {
      await fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
  }
  async function getCryptoPrices() {
      await fetch('/api/crypto/prices')
      .then(res => res.json())
      .then(data => {
          setCryptoPrices(data)
          setIsLoading(false)
      })
  }

  if (isLoading) { return <div>Chargement...</div> }

  return (
    <div className="header">
      <div className="profile-img-container">
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilImg} alt="profile-img" />
        </Link>
      </div>
      <p>Portefeuille : {getWalletAmount(user.wallet, cryptoPrices)}€</p>
    </div>
  )
}

function getWalletAmount(wallet, cryptoPrices) {
  let amount = 0
  wallet.forEach(crypto => {
    if (crypto.symbol !== 'EUR') {
      const x = getCurrencyPrice(cryptoPrices, crypto.symbol, crypto.cryptoAmount)
      amount += x
    } else amount += crypto.cryptoAmount
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