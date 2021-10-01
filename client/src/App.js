import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"

import './styles/colors.css';
import './styles/fonts.css';
import './styles/app.css';

import Home from './components/pages/home'
import About from './components/pages/about'
import Settings from './components/pages/settings'
import PageNotFound from './components/pages/404'
import Profile from './components/pages/profile'
import Login from './components/pages/login'
import IssueRport from './components/pages/issueReport'
import NeedFunds from './components/pages/needFunds'
import WallOfFame from './components/pages/wallOfFame'


import ProtectedRoute from './protectedRoute';
import issueReport from './components/pages/issueReport';

function App() {
  const name = 'ougo'
  //const [isAuth, setIsAuth] = useState(true)
  const isAuth = useState(true)

  return (
    <div className="App">
      <Router>
        
        <div className="menu-container">
          <div className="logo-container">
            <svg className="logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-80 -20 640 640"><path d="M176 140c0-5.523-4.477-10-10-10s-10 4.477-10 10v70h-20v240h20v60c0 5.523 4.477 10 10 10s10-4.477 10-10v-60h20V210h-20zm140-40c0-5.523-4.477-10-10-10s-10 4.477-10 10v70h-20v240h20v60c0 5.523 4.477 10 10 10s10-4.477 10-10v-60h20V170h-20zM36 10c0-5.523-4.477-10-10-10S16 4.477 16 10v70H-4v240h20v60c0 5.523 4.477 10 10 10s10-4.477 10-10v-60h20V80H36zm440 280h-20v-70c0-5.523-4.477-10-10-10s-10 4.477-10 10v70h-20v240h20v60c0 5.523 4.477 10 10 10s10-4.477 10-10v-60h20zm0 0" className="color000 svgShape"/></svg></svg>
            <h1>Crypto trading game</h1>
          </div>
          <div className="links-container">
            <Link className="active" to='/'>Home</Link>
            <Link to='/wall-of-fame'>Wall of fame</Link>
            <Link to='/need-funds'>Besoin d'argent</Link>
            <Link to='/issue'>Signaler un bug</Link>

            <Link to='/about'>About</Link>
          </div>
          <div className="bottom-menu-container">
            <Link to='/settings'>Paramètres</Link>
            <Link to='/login'>Déconnexion</Link>
          </div>
        </div>

        <div className="header-and-main-component-container">
          <div className="header-container">
            <div className="profile-img-container">
              <Link to={`/profile/${name}`}>
                <img src="https://imgr.search.brave.com/VdoCfUGzAfvuZWa3LrYw35Mjl6_YLxLTPAQZCBpUI4c/fit/800/800/ce/1/aHR0cHM6Ly9pbWct/Y2RuLmhsdHYub3Jn/L3BsYXllcmJvZHlz/aG90L0ppN3dQZHRE/TkVFRmhjZEhkMTJ6/TEQucG5nP2JnPTNl/NGM1NCZoPTgwMCZp/eGxpYj1qYXZhLTIu/MS4wJnJlY3Q9MTQ4/JTJDMzUlMkM0MjAl/MkM0MjAmdz04MDAm/cz0wNTQwYTc0Njg0/NWQwZmM3ZWMyYjZl/YjkzYzAzYzgyOA" alt="profile-img" />
              </Link>
            </div>
            <p>Portefeuille : 50€</p>
          </div>

          <div className="main-component-container">
            <Switch>
              <Route path='/login' exact component={Login} />
              <ProtectedRoute path='/' component={Home} isAuth={isAuth} exact />
              <ProtectedRoute path='/about' component={About} isAuth={isAuth} exact />
              <ProtectedRoute path='/issue' component={issueReport} isAuth={isAuth} exact />
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
