import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router"
import { Link } from "react-router-dom"

function Header() {
  //const userId = localStorage.getItem('token')
  const userId = 1
  const [ profil, setProfil ] = useState({ id: userId, username: 'adm01', walletAmount: 0, currency: '€', icon: 'https://imgr.search.brave.com/wsi2pod4FQkPRjzlUJHTecm3MAfSgOWSDRR2xGw95j8/fit/1200/1200/ce/1/aHR0cHM6Ly9vYXN5/cy5jaC93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMy9waG90/by1hdmF0YXItcHJv/ZmlsLnBuZw' })

  useEffect(() => {
    /* fetch(`/api/users/${profil.username}`)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      //setProfil(data)
    }, []) */
  })

  return (
    <div className="header">
      <div className="profile-img-container">
        <Link to={`/profile/${profil.id}`}>
          <img src={profil.icon} alt="profile-img" />
        </Link>
      </div>
      <p>Portefeuille : {profil.walletAmount}€</p>
    </div>
  )
}

export default withRouter(Header)