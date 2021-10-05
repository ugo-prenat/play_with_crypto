import { useParams } from "react-router"

function Profile() {

    const { name } = useParams()

    return (
        <div className="component">
            <p>Profil de {name}</p>
        </div>
    )
}

export default Profile