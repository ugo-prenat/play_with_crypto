import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"

import RegisterForm from "../loginPage/RegisterForm"
import LoginForm from "../loginPage/LoginForm"
import ResetPasswordForm from "../loginPage/ResetPasswordForm"

import '../../styles/form.css'
import '../../styles/login.css'

export default function Login() {
    const [ showForm, setShowForm ] = useState('login')
    let history = useHistory()

    const createGuestAccount = async () => {
        await fetch('/api/auth/guest', { method: 'POST' })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('userId', res.data.id)
            history.push('/')
            // Refresh the page to apply localstorage changes
            window.location.reload(false)
        })
    }

    useEffect(() => {
        fetch('/api/auth', { headers: setAuthHeaders() })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) history.push('/')
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="component login-component">
            <div className="guest-container">
                <button className="guest-button" onClick={createGuestAccount}>Continuer en tant qu'invité</button>
            </div>
            <div className="form-container">
                {showForm === 'login' ? <LoginForm /> : showForm === 'register' ? <RegisterForm /> : <ResetPasswordForm />}
                {showForm === 'login' ?
                    <div className="form-bottom-link-container">
                        <p className="form-bottom-link" onClick={() => setShowForm('resetPassword')}><span>Mot de passe oublié</span></p>
                        <p className="form-bottom-link">Pas de compte ?<span onClick={() => setShowForm('register')}>S'inscire</span></p>
                    </div>
                    :
                    <p className="form-bottom-link">Déjà inscrit ?<span onClick={() => setShowForm('login')}>Se connecter</span></p>    
                }
            </div>
        </div>
    )
}
function setAuthHeaders() {
    const token = localStorage.getItem('accessToken')
    return {'authorization': `Bearer ${token ? token : ''}`}
}
