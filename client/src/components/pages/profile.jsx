import { useParams } from "react-router"

function Profile() {

    const { name } = useParams()

    return (
        <div>
            <p>Salut {name}, voici ton profil</p>
        </div>
    )
}

export default Profile