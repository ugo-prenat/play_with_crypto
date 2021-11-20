import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import { AUTH_HEADERS } from '../../authHeaders'

export default function About() {
    let history = useHistory()

    useEffect(() => {
        fetch('/api/auth', { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(res => {
            if (res.code !== 200) history.push('/login')
        })
    }, [])

    return (
        <div className="component">
            <ul>
                <li>Projet réalisé par un étudiant en L2 : dev web et mobile</li>
                <li>Réalisé dans le but de présenter un projet de taille moyenne dans portfolio</li>
                <li>Projet MERN (MongoDB, Express, React, NodeJS)</li>
                <li><a target="_blank" href="https://github.com/ugooP/crypto_trading_game" rel="noopener noreferrer">Projet GitHib</a></li>
            </ul>
        </div>
    )
}