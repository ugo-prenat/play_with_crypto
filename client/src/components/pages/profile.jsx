import { useParams } from "react-router"

function Profile() {

    const { name } = useParams()

    return (
        <div>
            <p>Profil de {name}</p>
        </div>
    )
}

export default Profile