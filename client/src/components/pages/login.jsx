import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"

import RegisterForm from "../loginPage/RegisterForm"
import LoginForm from "../loginPage/LoginForm"

import '../../styles/form.css'
import '../../styles/login.css'

function Login() {
    const [ showForm, setShowForm ] = useState('login')
    let history = useHistory()

    const createGuestAccount = async () => {
        await fetch('/api/auth/guest', { method: 'POST' })
        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem('accessToken', res.data.accessToken)
            sessionStorage.setItem('userId', res.data.id)
            history.push('/')
        })
    }

    useEffect(() => {
        localStorage.clear()
        sessionStorage.clear()
    })

    return (
        <div className="component login-component">
            <div className="guest-container">
                <button className="guest-button" onClick={createGuestAccount}>Continuer en tant qu'invité</button>
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