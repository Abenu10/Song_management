import axios, { AxiosResponse } from 'axios'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem('token')

const api = axios.create({
    baseURL: VITE_BASE_URL,
    withCredentials: true,
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})

export default api

// interface UserCredential {
//     name: string
//     password: string
// }

// interface DispatchAction {
//     type: string
//     payload?: any
// }

// export const loginCall = async (
//     userCredential: UserCredential,
//     dispatch: (arg: DispatchAction) => void
// ): Promise<void> => {
//     dispatch({ type: 'LOGIN_START' })
//     try {
//         const res: AxiosResponse = await api.post('/auth', userCredential)
//         dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
//     } catch (err) {
//         dispatch({ type: 'LOGIN_FAILURE', payload: err })
//     }
// }
