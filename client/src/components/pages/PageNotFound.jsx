import { useHistory } from "react-router-dom"
import Lottie from "lottie-react"
import powerSocket from '../../anim/powerSocket.json'

import '../../styles/pageNotFound.css'

export default function PageNotFound() {
    let history = useHistory()

    return (
        <div className="page-not-found-container component">
            <div className="bg-container">
                <Lottie
                    autoplay={true}
                    animationData={powerSocket}
                    rendererSettings={{preserveAspectRatio: "xMidYMid slice"}}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}
                />
            </div>
            <div className="content-container">
                <div className="content">
                    <p className="title">Oups...</p>
                    <p className="text">La page que vous essayez de consulter n'existe pas</p>
                    <button onClick={() => history.push('/')}>Retour au site</button>
                </div>
            </div>
        </div>
    )
}
