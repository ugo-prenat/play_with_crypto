import React, { useState } from 'react'
import ChangePasswordForm from './ChangePasswordForm'


export default function UserData(props) {
    const user = props.user
    const [isGuest, setIsGuest] = useState(user.mail ? false : true)
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)

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
                <input type="text" value={user.profilImg} />
            </div>

            {showChangePasswordForm && <ChangePasswordForm hideForm={() => setShowChangePasswordForm(false)} />}
        </div>
    )
}
