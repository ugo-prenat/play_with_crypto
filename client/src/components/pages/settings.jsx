import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import { AUTH_HEADERS } from '../../authHeaders'

export default function Settings() {
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
            <p>Settings page</p>
        </div>
    )
}