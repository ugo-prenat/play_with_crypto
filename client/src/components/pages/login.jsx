import RegisterForm from "../RegisterForm"
import LoginForm from "../LoginForm"

import '../../styles/form.css'
import '../../styles/login.css'

function Login() {

    return (
        <div className="component">
            <RegisterForm />
            <LoginForm />
        </div>
    )
}

export default Login