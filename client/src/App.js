import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './styles/colors.css';
import './styles/fonts.css';
import './styles/app.css';

import Menu from './components/menu'
import Header from './components/header'

import Home from './components/pages/home'
import About from './components/pages/about'
import Settings from './components/pages/settings'
import PageNotFound from './components/pages/404'
import Profile from './components/pages/profile'
import Login from './components/pages/login'
import IssueReport from './components/pages/issueReport'
import NeedFunds from './components/pages/needFunds'
import WallOfFame from './components/pages/wallOfFame'

import ProtectedRoute from './protectedRoute';

function App() {
  //const [isAuth, setIsAuth] = useState(true)
  const isAuth = useState(true)

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
              <ProtectedRoute path='/issue' component={IssueReport} isAuth={isAuth} exact />
              <ProtectedRoute path='/settings' component={Settings} isAuth={isAuth} exact />
              <ProtectedRoute path='/need-funds' component={NeedFunds} isAuth={isAuth} exact />
              <ProtectedRoute path='/profile/:name' component={Profile} isAuth={isAuth} exact />
              <ProtectedRoute path='/wall-of-fame' component={WallOfFame} isAuth={isAuth} exact />
              <Route path='*' exact component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;