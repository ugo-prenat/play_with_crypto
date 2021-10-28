import RegisterForm from "../loginPage/RegisterForm"
import LoginForm from "../loginPage/LoginForm"

import '../../styles/form.css'
import '../../styles/login.css'
import { useState } from "react"

function Login() {
    const [ showForm, setShowForm ] = useState('login')
    
    return (
        <div className="component login-component">
            <div className="guest-container">
                <button className="guest-button">Continuer en tant qu'invité</button>
            </div>
            <div className="form-container">
                {showForm === 'login' ? <LoginForm /> : <RegisterForm />}
                {showForm === 'login' ?
                    <p className="form-bottom-link">Pas de compte ?<span onClick={() => setShowForm('register')}>S'inscire</span></p>:
                    <p className="form-bottom-link">Déjà inscrit ?<span onClick={() => setShowForm('login')}>Se connecter</span></p>    
                }
            </div>
        </div>
    )
}

export default Login