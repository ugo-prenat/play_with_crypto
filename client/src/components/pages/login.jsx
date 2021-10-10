import RegisterForm from "../RegisterForm"
import LoginForm from "../LoginForm"

import '../../styles/form.css'
import '../../styles/login.css'
import { useState } from "react"

function Login() {
    const [ showForm, setShowForm ] = useState('login')
    
    return (
        <div className="component login-component">
            <div className="form-container">
                {showForm === 'login' ? <LoginForm /> : <RegisterForm />}
                {showForm === 'login' ?
                    <p className="form-bottom-link">Pas de compte ?<a onClick={() => setShowForm('register')}>S'inscire</a></p>:
                    <p className="form-bottom-link">Déjà inscrit ?<a onClick={() => setShowForm('login')}>Se connecter</a></p>    
                }
            </div>
        </div>
    )
}

export default Login