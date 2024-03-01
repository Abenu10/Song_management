import {
    Login,
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
} from './Register.style'
import { useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { RootState } from '../../state/store'
// const api = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL,
// })
import { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerStart } from '../../state/auth/authSlice'

function Register() {
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const passwordAgain = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isFetching, error } = useSelector((state: RootState) => state.auth)

    async function handleClick(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (passwordAgain.current?.value === password.current?.value) {
            const user = {
                name: name.current?.value,
                email: email.current?.value,
                password: password.current?.value,
            }
            try {
                await dispatch(
                    registerStart({
                        email: email.current?.value,
                        password: password.current?.value,
                        passwordAgain: passwordAgain.current?.value,
                        name: name.current?.value,
                    })
                )
                // can't load songs if navigate is called on homepage
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
        <>
            {isFetching && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <Login>
                <LoginWrapper>
                    <LoginLeft>
                        <LoginLogo>Muzikabet</LoginLogo>
                        <LoginDesc>
                            Listen to music with others, discover new tracks,
                            and share your passion for music on Muzikabet.
                        </LoginDesc>
                    </LoginLeft>
                    <LoginRight>
                        <LoginBox onSubmit={handleClick}>
                            <LoginInput
                                placeholder="name"
                                required
                                ref={name}
                            />
                            <LoginInput
                                placeholder="Email"
                                type="email"
                                required
                                ref={email}
                            />
                            <LoginInput
                                placeholder="Password"
                                type="password"
                                required
                                ref={password}
                            />
                            <LoginInput
                                placeholder="Password Again"
                                type="password"
                                minLength={6}
                                required
                                ref={passwordAgain}
                            />
                            <LoginButton type="submit">Sign Up</LoginButton>

                            <LoginRegisterButton
                                onClick={() => navigate('/login')}
                            >
                                Login into Account
                            </LoginRegisterButton>
                        </LoginBox>
                    </LoginRight>
                </LoginWrapper>
            </Login>
        </>
    )
}

export default Register
