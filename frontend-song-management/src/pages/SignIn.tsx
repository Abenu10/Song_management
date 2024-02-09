import { useState } from 'react'
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
    SecondaryColor,
} from './Signin.styled'
import { useDispatch } from 'react-redux'

interface SignInFormState {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<SignInFormState>({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'LOGIN_REQUEST', payload: formData })
    }

    return (
        <Login>
            <LoginWrapper>
                <LoginLeft>
                    <LoginDesc>
                        Connect with friends and the world around you on
                        HabeshaNet.
                    </LoginDesc>
                    <LoginBox onSubmit={handleSubmit}>
                        <LoginInput
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <LoginInput
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <LoginButton type="submit">Login</LoginButton>
                        <LoginForgot>Forgot Password?</LoginForgot>
                        <LoginRegisterButton>Register</LoginRegisterButton>
                    </LoginBox>
                </LoginLeft>
                <LoginRight>
                    <LoginLogo>HabeshaNet</LoginLogo>
                </LoginRight>
            </LoginWrapper>
        </Login>
    )
}

export default SignIn
