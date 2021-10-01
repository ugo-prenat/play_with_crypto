import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Home from './components/pages/home'
import About from './components/pages/about'
import Settings from './components/pages/settings'
import PageNotFound from './components/pages/404'
import Profile from './components/pages/profile'
import Login from './components/pages/login'
import ProtectedRoute from './protectedRoute';
import { useState } from 'react';

function App() {
  const name = 'ougo'
  const [isAuth, setIsAuth] = useState(true)

  return (
    <div className="App">
      <Router>
        <header>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/settings'>Settings</Link>
          <Link to={`/profile/${name}`}>Profile</Link>
        </header>
        <Switch>
          <Route path='/login' exact component={Login} />
          <ProtectedRoute path='/' component={Home} isAuth={isAuth} exact />
          <ProtectedRoute path='/about' component={About} isAuth={isAuth} exact />
          <ProtectedRoute path='/settings' component={Settings} isAuth={isAuth} exact />
          <ProtectedRoute path='/profile/:name' component={Profile} isAuth={isAuth} exact />
          <Route path='*' exact component={PageNotFound} />

          {/* <Route path='/about' exact component={About} />
          <Route path='/settings' exact component={Settings} />
          <Route path='/profile/:name' exact component={Profile} />
          <Route path='/login' exact component={Login} />
          <Route path='*' exact component={PageNotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
