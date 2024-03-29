import styled from 'styled-components'

export const Login = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #1d1e22;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0d1117;
`

export const LoginWrapper = styled.div`
    width: 70%;
    height: 70%;
    display: flex;
`

export const LoginLeft = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 15px;
`

export const LoginRight = styled(LoginLeft)``

export const LoginLogo = styled.div`
    font-size: 50px;
    font-weight: 800;
    color: #1775ee;
    margin-bottom: 10px;
`

export const LoginDesc = styled.span`
    font-size: 24px;
`

export const LoginBox = styled.form`
    height: 400px;
    padding: 20px;
    background-color: #010101;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const LoginInput = styled.input`
    color: #010409;
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
    &:focus {
        outline: none;
    }
`

export const LoginButton = styled.button`
    background-color: #1f6fd0;
    height: 50px;
    border-radius: 10px;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &:disabled {
        cursor: not-allowed;
    }
`

export const LoginForgot = styled.span`
    text-align: center;
    color: #1775ee;
`

export const LoginRegisterButton = styled.button`
    width: 60%;
    align-self: center;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #42b72a;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`
