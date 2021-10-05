import React from 'react';
import { withRouter } from "react-router"
import { Link } from "react-router-dom"

function Home(props) {
    return (
        <div className="component">
            <Link to='/about'>about</Link>
            <p>Home page</p>
        </div>
    )
}

export default withRouter(Home)