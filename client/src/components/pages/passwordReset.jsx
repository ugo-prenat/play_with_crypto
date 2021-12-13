import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom"

import '../../styles/resetPassword.css'
import FormButton from '../FormButton'

export default function PasswordReset(props) {
    const { register, handleSubmit, formState: {errors}, formState } = useForm({
        mode: 'onTouched'
    })
    const { isSubmitting } = formState
    const [ showPassword, setShowPassword ] = useState(false)
    const [accessToken, setAccessToken] = useState()
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    let history = useHistory()

    useEffect(() => {
        const token = props.match.params.accessToken
        setAccessToken(token)

        // Get user from access token
        fetch('/api/auth', { headers: setAuthHeaders(token) })
        .then(res => res.json())
        .then(res => {
            // If access token is invalid, redirect to the "page not found"
            if (res.code !== 200 ) history.push('/404')
            else {
                setUser(res.user)
                setIsLoading(false)
            }
        })
        // eslint-disable-next-line
    }, [])

    const onSubmit = async data => {
        // Set the new password
        fetch(`/api/users/${user.id}/password`, {
            method: 'PATCH',
            headers: setAuthHeaders(accessToken),
            body: JSON.stringify({ newPassword: data.password })
        })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('userId', user.id)
                
                history.push('/login')
                // Refresh the page to apply localstorage changes
                window.location.reload(false)
            }
        })
    }

    if (isLoading) { return <div className="reset-password-component"><div className="loading-container"><p>Chargement...</p></div></div> }

    return (
        <div className="reset-password-component">
            <div className="form-container">
                <form className="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
                    <p className="form-title">Réinitialistation du mot de passe</p>

                    <div style={errors.password && {borderColor: 'var(--error-color)'}} className="input-group password-input-group active-input-group" group="password">
                        <label style={errors.password && {color: 'var(--error-color)'}} htmlFor="password" className="input-label">Nouveau mot de passe</label>
                        <input
                            {...register('password',
                            {
                                required: 'Mot de passe obligatoire',
                                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Minimum 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial' },
                            })}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autoFocus
                            className="input-field"
                        />
                    
                        <div className="show-password-container">
                            <svg
                                onClick={() => setShowPassword(!showPassword)}
                                xmlns="http://www.w3.org/2000/svg" 
                                className="password-eye-off" 
                                viewBox="0 0 512 512">
                                    {showPassword ?
                                        <g><path d="M508.7 246c-4.6-6.3-113.6-153.2-252.7-153.2S7.8 239.8 3.2 246c-4.3 5.9-4.3 14 0 19.9 4.6 6.3 113.6 153.2 252.7 153.2s248.2-146.9 252.7-153.2C513.1 260 513.1 252 508.7 246zM256 385.4c-102.5 0-191.3-97.5-217.6-129.4 26.3-31.9 114.9-129.4 217.6-129.4 102.5 0 191.3 97.5 217.6 129.4C447.4 287.9 358.7 385.4 256 385.4z"/><path d="M256 154.7c-55.8 0-101.3 45.4-101.3 101.3s45.4 101.3 101.3 101.3 101.3-45.4 101.3-101.3S311.8 154.7 256 154.7zM256 323.5c-37.2 0-67.5-30.3-67.5-67.5s30.3-67.5 67.5-67.5 67.5 30.3 67.5 67.5S293.2 323.5 256 323.5z"/></g> :
                                        <g><path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z"/><path d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z"/></g>
                                    }
                            </svg>
                        </div>
                    </div>

                    {errors.password && 
                        <div className="error-msg-container password-error-msg-container">
                            <svg style={{width: '12%'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z"/></svg>
                            <p className="error-msg">{errors.password && errors.password.message}</p>
                        </div>
                    }

                    <button className="input-submit" disabled={isSubmitting}>Réinitialiser</button>
                </form>
            </div>
        </div>
    )
}
function setAuthHeaders(accessToken) {
    return {'authorization': `Bearer ${accessToken}`}
}
