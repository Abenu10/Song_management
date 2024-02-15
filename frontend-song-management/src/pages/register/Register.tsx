import { useRef } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

function Register() {
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value === password.current.value) {
            const user = {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await api.post('/users', user)
                navigate('/login')
            } catch (err) {
                console.log(err)
                console.log(user)
            }
        } else {
            console.log("Passwords don't match")
        }
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="loginLogo">HabeshaNet</div>
                    <span className="loginDesc">
                        Connect with friends and the world around you on
                        HabeshaNet.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="name"
                            required
                            ref={name}
                            className="loginInput"
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            ref={email}
                            className="loginInput"
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            ref={password}
                            className="loginInput"
                        />
                        <input
                            placeholder="Password Again"
                            type="password"
                            minLength="6"
                            required
                            ref={passwordAgain}
                            className="loginInput"
                        />
                        <button className="loginButton" type="submit">
                            Sign Up
                        </button>

                        <button className="loginRegisterButton">
                            Login into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
