import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import Lottie from "react-lottie"
import successAnim from '../../anim/success.json'

export default function ResetPasswordForm() {
    const { register, handleSubmit, formState: {errors}, formState, setError } = useForm({
        mode: 'onTouched'
    })
    const { isSubmitting } = formState
    const [isMailSent, setIsMailSent] = useState(false)

    const onSubmit = async data => {
        // check if the given mail is associated to an account
        fetch('/api/auth/mail', { method: 'POST', body: JSON.stringify({ mail: data.mail }) })
        .then(res => res.json())
        .then(res => {
            if (res.code === 400) handleError(res)
            else setIsMailSent(true)
        })
    }
    function handleError(error) {
        setError('mail', {
            type: 'manual',
            message: error.msg
        })
    }


    return (
        <form className="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
            <p className="form-title">Mot de passe oublié</p>

            <div style={errors.mail && {borderColor: 'var(--error-color)'}} className="input-group mail-input-group active-input-group" group="mail">
                <label style={errors.mail && {color: 'var(--error-color)'}} htmlFor="mail" className="input-label">Mail</label>
                <input
                    {...register('mail',
                    {
                        required: 'Mail obligatoire',
                        pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Mail invalide' }
                    })}
                    type="email"
                    name="mail"
                    className="input-field"
                    autoFocus
                />
            </div>

            {errors.mail &&
                <div className="error-msg-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z"/></svg>
                    <p className="error-msg">{errors.mail && errors.mail.message}</p>
                </div>
            }

            <button className="input-submit" disabled={isSubmitting}>
                { isMailSent ?
                    <div className="success">
                        <div className="lottie-container">
                            <Lottie
                                options={{
                                    loop: false,
                                    autoplay: true,
                                    animationData: successAnim,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice"
                                    }
                                }}
                                width={25}
                                height={25}
                            />
                        </div>
                        <p>Email envoyé</p>
                    </div>
                    : 
                    'Réinitialiser mon mot de passe'
                }
            </button>
        </form>
    )
}
