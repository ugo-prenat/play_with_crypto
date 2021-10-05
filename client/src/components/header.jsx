import React from 'react';
import { withRouter } from "react-router"
import { Link } from "react-router-dom"

function Header(props) {
    const username = 'ougo'

    return (
        <div className="header">
            <div className="profile-img-container">
              <Link to={`/profile/${username}`}>
                <img src="https://imgr.search.brave.com/VdoCfUGzAfvuZWa3LrYw35Mjl6_YLxLTPAQZCBpUI4c/fit/800/800/ce/1/aHR0cHM6Ly9pbWct/Y2RuLmhsdHYub3Jn/L3BsYXllcmJvZHlz/aG90L0ppN3dQZHRE/TkVFRmhjZEhkMTJ6/TEQucG5nP2JnPTNl/NGM1NCZoPTgwMCZp/eGxpYj1qYXZhLTIu/MS4wJnJlY3Q9MTQ4/JTJDMzUlMkM0MjAl/MkM0MjAmdz04MDAm/cz0wNTQwYTc0Njg0/NWQwZmM3ZWMyYjZl/YjkzYzAzYzgyOA" alt="profile-img" />
              </Link>
            </div>
            <p>Portefeuille : 50€</p>
        </div>
    )
}

export default withRouter(Header)