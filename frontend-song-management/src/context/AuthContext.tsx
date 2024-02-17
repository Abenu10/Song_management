import { createContext, useEffect, useReducer, ReactNode } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '')?.user : null,
    isFetching: false,
    error: false,
};
interface AuthState {
    user: any; // Replace 'any' with the actual type of your user object
    isFetching: boolean;
    error: boolean;
    dispatch: React.Dispatch<any>; // Replace 'any' with the actual type of your action object
}

export const AuthContext = createContext<AuthState>(INITIAL_STATE as AuthState)

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}