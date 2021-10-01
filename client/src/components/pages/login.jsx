import { useHistory } from "react-router"

function Login() {

    let history = useHistory()

    return (
        <div>
            <input type="text" placeholder='username' />
            <input type="text" placeholder='password' />
            <button onClick={() => history.push('/')}>Login</button>
        </div>
    )
}

export default Login