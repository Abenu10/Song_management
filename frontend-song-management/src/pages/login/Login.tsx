import { useRef } from 'react'
import './login.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginStart } from '../../state/auth/authSlice'
import { CircularProgress } from '@mui/material'

import { FormEvent } from 'react'
import { RootState } from '../../state/store'
import axios from 'axios'
// Call this function after login
const checkToken = async () => {
    try {
        const res = await axios.get('/api/auth')
        if (res.data.valid) {
            console.log('Token is valid')
        } else {
            console.log('Token is not valid')
        }
    } catch (err) {
        console.log('Error: ', err)
    }
}
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching } = useSelector((state: RootState) => state.auth)
    
    // how are we going to handle the form submission?
    // can also use usestate but every time you type it will rerender you should prevent that as much as you can
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    // const { isFetching } = useContext(AuthContext)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // loginCall(
    //     { email: email.current.value, password: password.current.value },
        //     dispatch
        // )
        try {
            await dispatch(
                loginStart({
                    email: email.current?.value,
                    password: password.current?.value,
                })
            )
            navigate('/')
            checkToken()
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(user)

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
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input
                            placeholder="Email"
                            type="email"
                            className="loginInput"
                            required
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            minLength="6"
                            className="loginInput"
                            required
                            ref={password}
                        />
                        <button
                            className="loginButton"
                            type="submit"
                            disabled={isFetching}
                        >
                            {isFetching ? (
                                <CircularProgress
                                    color="secondary"
                                    size="20px"
                                />
                            ) : (
                                'Log In'
                            )}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? (
                                <CircularProgress
                                    color="secondary"
                                    size="20px"
                                />
                            ) : (
                                'Create a New Account'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
