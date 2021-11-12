import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './styles/colors.css';
import './styles/fonts.css';
import './styles/app.css';
import './styles/header.css';
import './styles/menu.css';
import './styles/mainComponent.css';
import './styles/generics.css';

import Menu from './components/Menu'
import Header from './components/Header'

import Home from './components/pages/Home'
import About from './components/pages/About'
import Activity from './components/pages/Acticity'
import Settings from './components/pages/Settings'
import PageNotFound from './components/pages/PageNotFound'
import Profile from './components/pages/Profile'
import Login from './components/pages/Login'
import IssueReport from './components/pages/IssueReport'
import NeedFunds from './components/pages/NeedFunds'
import Wallet from './components/pages/Wallet'

import ProtectedRoute from './protectedRoute';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [ user, setUser ] = useState({})

  async function getUser() {
    const userId = 1
  
    await fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(user => setUser(user))
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="App">
      <Router>
        <div className="menu-container">
          <Menu />
        </div>

        <div className="header-and-main-component-container">
          <div className="header-container">
            <Header />
          </div>

          <div className="main-component-container">
            <Switch>
              <Route path='/login' exact component={Login} />
              <ProtectedRoute path='/' component={Home} isAuth={isAuth} exact />
              <ProtectedRoute path='/about' component={About} isAuth={isAuth} exact />
              <ProtectedRoute path='/wallet' component={Wallet} isAuth={isAuth} exact />
              <ProtectedRoute path='/issue' component={IssueReport} isAuth={isAuth} exact />
              <ProtectedRoute path='/settings' component={Settings} isAuth={isAuth} exact />
              <ProtectedRoute path='/activity' component={Activity} isAuth={isAuth} exact />
              <ProtectedRoute path='/need-funds' component={NeedFunds} isAuth={isAuth} exact />
              <ProtectedRoute path='/profile/:name' component={Profile} isAuth={isAuth} exact />
              <Route path='*' exact component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;