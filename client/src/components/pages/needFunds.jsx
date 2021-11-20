import React, { useEffect } from 'react'
import { AUTH_HEADERS } from '../../authHeaders'
import { useHistory } from "react-router-dom"

export default function NeedFunds() {
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
            <p>No more money ?</p>
            <p>Need funds !</p>
        </div>
    )
}
