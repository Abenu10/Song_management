// import axios, { AxiosResponse } from 'axios';

// interface Credentials {
//     username: string;
//     password: string;
// }

// interface User {
//     // Define user properties here...
// }

// const login = (credentials: Credentials): Promise<AxiosResponse<User>> => {
//     return axios.post('/api/auth/login', credentials);
// };

// const register = (user: User): Promise<AxiosResponse<User>> => {
//     return axios.post('/api/auth/register', user);
// };

// export default {
//     login,
//     register,
//     // other auth related API calls...
// };
// import axios from 'axios'

// const API_URL = 'http://localhost:8800/api' // Replace with your actual API URL

// export const login = async (email: string, password: string) => {
//     try {
//         const response = await axios.post('http://localhost:8800/api/auth', {
//             email,
//             password,
//         })
//         return response.data
//     } catch (error) {
//         throw new Error('Error logging in: ' + error)
//     }
// }

// Add other authentication methods (e.g., logout, register) if needed
import axios from 'axios';
const API_URL = 'http://localhost:8800/api'
export const login = (email: string, password: string) => {
    return axios.post(`${API_URL}/api/auth`, { email, password });
};