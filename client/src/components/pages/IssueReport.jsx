import React, { useEffect, } from 'react'
import { useHistory } from "react-router-dom"
import { AUTH_HEADERS } from '../../authHeaders'

import { BACKEND_URL as URL } from '../../constants/constants';

export default function IssueReport() {
    let history = useHistory()

    useEffect(() => {
        fetch(`${URL}/api/auth`, { headers: AUTH_HEADERS })
        .then(res => res.json())
        .then(res => {
            if (res.code !== 200) history.push('/login')
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="component">
            <p>Report an issue or a problem</p>
        </div>
    )
}
