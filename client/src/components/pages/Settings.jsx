import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { AUTH_HEADERS } from '../../authHeaders'

import UserData from "../settingsPage/UserData"

import '../../styles/settings.css'

export default function Settings() {
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    let history = useHistory()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetch('/api/auth', { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(res => {
            if (res.code !== 200) history.push('/login')
            else {
                getUser(userId).then(() => setIsLoading(false))
            }
        })
        // eslint-disable-next-line
    }, [])

    async function getUser() {
        await fetch(`/api/users/${userId}`, { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(data => setUser(data))
    }

    if (isLoading) { return <div className="loading-container"><p>Chargement des paramètres...</p></div> }

    return (
        <div className="component settings-component">
            {<UserData user={user} />}
        </div>
    )
}
