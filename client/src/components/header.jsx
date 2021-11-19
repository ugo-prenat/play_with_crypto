import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router"
import { Link } from "react-router-dom"


function Header() {
  const [user, setUser] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
      fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) { return <div>Chargement...</div> }

  return (
    <div className="header">
      <div className="profile-img-container">
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilImg} alt="profile-img" />
        </Link>
      </div>
      <p>Portefeuille : {getWalletAmount(user.wallet)}€</p>
    </div>
  )
}

function getWalletAmount(wallet) {
  let amount = 0
  wallet.forEach(crypto => amount += crypto.currencyAmount)
  return amount
}

export default withRouter(Header)