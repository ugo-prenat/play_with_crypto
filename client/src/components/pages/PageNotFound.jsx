import { useHistory } from "react-router-dom"

import '../../styles/pageNotFound.css'

export default function PageNotFound() {
    let history = useHistory()

    return (
        <div className="page-not-found-container component">
            <h1>404 not found</h1>
            <button onClick={() => history.push('/')}>Revenir au site</button>
        </div>
    )
}