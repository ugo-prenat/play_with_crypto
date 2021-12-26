import React, { useState } from 'react'

import ChangePasswordForm from './ChangePasswordForm'
import Loading from '../Loading'

import { AUTH_HEADERS } from '../../authHeaders'
import { BACKEND_URL as URL } from '../../constants/constants';

export default function UserData(props) {
    const user = props.user
    const userId = localStorage.getItem('userId')

    const isGuest = user.mail ? false : true
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)

    const [profileImg, setProfileImg] = useState(user.profilImg)
    const [linkError, setLinkError] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [successChange, setSuccessChange] = useState(false)

    function handleProfileImg(e) {
        setProfileImg(e.target.value)

        if (isLink(e.target.value)) {
            setLinkError(false)

            setIsLoading(true)

            saveProfileImg(e.target.value)
        } else {
            setLinkError(true)
        }
    }
    async function saveProfileImg(link) {
        fetch(`${URL}/api/users/${userId}`, {
            method: 'PATCH',
            headers: AUTH_HEADERS,
            body: JSON.stringify({ profilImg: link })
        })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                setIsLoading(false)
                setSuccessChange(true)
                // Hide success anim after 2s
                setTimeout(() => setSuccessChange(false), 2000)
            }
        })
    }

    return (
        <div className="user-data-container">
            <div className="element">
                <p>Id</p>
                <p>{user.id}</p>
            </div>
            <div className="element">
                <p>Nom d'utilisateur</p>
                <p>{user.username}</p>
            </div>
            <div className="element">
                <p>Membre depuis</p>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className={isGuest ? 'element hide' : 'element'}>
                <p>Mail</p>
                <p>{isGuest ? '-' : user.mail}</p>
            </div>
            <div className={isGuest ? 'element hide' : 'element'}>
                <p>Mot de passe</p>
                <p>
                    {isGuest ? '-' :
                    <button onClick={() => setShowChangePasswordForm(true)}>Changer</button>
                    }
                </p>
            </div>
            <div className="element">
                <p>Image de profil</p>
                <div className="change-profile-img-container">
                    {isLoading && <Loading />}
                    {successChange && <svg className="success-change-anim" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="#0A0A30" strokeLinecap="round" strokeWidth="1.5" d="M5.387 12.68l3.955 3.956 9.271-9.272" strokeDashoffset="100" strokeDasharray="100"/></svg>}

                    <input className={linkError ? "input-error" : ""} type="text" value={profileImg} onChange={e => handleProfileImg(e)} />
                    {linkError && <p className="link-error-msg">Lien invalide</p>}
                </div>
            </div>

            {showChangePasswordForm && <ChangePasswordForm hideForm={() => setShowChangePasswordForm(false)} />}
        </div>
    )
}
function isLink(link) {
    const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    return regex.test(link)
}