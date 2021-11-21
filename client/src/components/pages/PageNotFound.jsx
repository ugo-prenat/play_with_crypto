import { useHistory } from "react-router-dom"

import '../../styles/pageNotFound.css'

export default function PageNotFound() {
    let history = useHistory()

    return (
        <div className="page-not-found-container component">
            <div className="content-container">
                <img src="" alt="" />
                <p className="title">Oups...</p>
                <p className="text">Il semble que cette page n'existe pas</p>
                <button onClick={() => history.push('/')}>Retour au site</button>
            </div>
        </div>
    )
}
