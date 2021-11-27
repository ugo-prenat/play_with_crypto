import { useHistory } from "react-router-dom"
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
import Login from './components/pages/Login'
import IssueReport from './components/pages/IssueReport'
import NeedFunds from './components/pages/NeedFunds'
import Wallet from './components/pages/Wallet'

function App() {
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
              <Route path='/'           component={Home} exact />
              <Route path='/about'      component={About} exact />
              <Route path='/login'      component={Login} exact />
              <Route path='/wallet'     component={Wallet} exact />
              <Route path='/settings'   component={Settings} exact />
              <Route path='/activity'   component={Activity} exact />
              <Route path='/need-funds' component={NeedFunds} exact />
              <Route path='/issue'      component={IssueReport} exact />
              <Route path='*' component={PageNotFound} exact />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;