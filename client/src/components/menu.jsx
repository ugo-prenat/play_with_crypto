import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"

import Home from './pages/home'
import About from './pages/about'
import Settings from './pages/settings'
import PageNotFound from './pages/404'
import Profile from './pages/profile'
import Login from './pages/login'
import ProtectedRoute from '../protectedRoute';

export default function Menu() {
    const name = 'ougo'
    //const [isAuth, setIsAuth] = useState(true)
    const isAuth = useState(true)

    return (
        <div className="menu-container">
            <div className="logo-container">
                <img src="../../img/chart.svg" alt="" />
            </div>
            <Router>
                <Switch>
                    <Route path='/login' exact component={Login} />
                    <ProtectedRoute path='/' component={Home} isAuth={isAuth} exact />
                    <ProtectedRoute path='/about' component={About} isAuth={isAuth} exact />
                    <ProtectedRoute path='/settings' component={Settings} isAuth={isAuth} exact />
                    <ProtectedRoute path='/profile/:name' component={Profile} isAuth={isAuth} exact />
                    <Route path='*' exact component={PageNotFound} />
                </Switch>

                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/settings'>Settings</Link>
                <Link to={`/profile/${name}`}>Profile</Link>
                
            </Router>
        </div>
    )
}
