import { useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginStart, loginSuccess } from '../../state/auth/authSlice'
import { CircularProgress } from '@mui/material'

import { FormEvent } from 'react'
import { RootState } from '../../state/store'

import axios from 'axios'
import {
    LoginContainer,
    LoginWrapper,
    LoginLeft,
    LoginRight,
    LoginLogo,
    LoginDesc,
    LoginBox,
    LoginInput,
    LoginButton,
    LoginForgot,
    LoginRegisterButton,
} from './Login.style'

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

    const { user } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (user) {
            navigate('/')
            checkToken()
        }
    }, [user, navigate])
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
            // navigate('/')
            // checkToken()
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(user)

    return (
        <LoginContainer>
            <LoginWrapper>
                <LoginLeft>
                    <LoginLogo>HabeshaNet</LoginLogo>
                    <LoginDesc>
                        Connect with friends and the world around you on
                        HabeshaNet.
                    </LoginDesc>
                </LoginLeft>
                <LoginRight>
                    <LoginBox onSubmit={handleSubmit}>
                        <LoginInput
                            placeholder="Email"
                            type="email"
                            required
                            ref={email}
                        />
                        <LoginInput
                            placeholder="Password"
                            type="password"
                            minLength="6"
                            required
                            ref={password}
                        />
                        <LoginButton type="submit" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress
                                    color="secondary"
                                    size="20px"
                                />
                            ) : (
                                'Log In'
                            )}
                        </LoginButton>
                        <LoginForgot>Forgot Password?</LoginForgot>
                        <LoginRegisterButton>
                            {isFetching ? (
                                <CircularProgress
                                    color="secondary"
                                    size="20px"
                                />
                            ) : (
                                'Create a New Account'
                            )}
                        </LoginRegisterButton>
                    </LoginBox>
                </LoginRight>
            </LoginWrapper>
        </LoginContainer>
    )
}

export default Login
