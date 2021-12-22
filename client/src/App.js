import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './styles/app.css';
import './styles/menu.css';
import './styles/fonts.css';
import './styles/colors.css';
import './styles/header.css';
import './styles/generics.css';
import './styles/mainComponent.css';

import Menu from './components/Menu'
import Header from './components/Header'

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import About from './components/pages/About'
import Wallet from './components/pages/Wallet'
import Settings from './components/pages/Settings'
import Activity from './components/pages/Acticity'
import IssueReport from './components/pages/IssueReport'
import PageNotFound from './components/pages/PageNotFound'
import PasswordReset from "./components/pages/PasswordReset";

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />

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
              <Route path='/issue'      component={IssueReport} exact />
              <Route path='/password/reset/:accessToken' component={PasswordReset} exact />
              <Route path='*'           component={PageNotFound} exact />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;