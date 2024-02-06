import axios, { AxiosResponse } from 'axios';

interface Credentials {
    username: string;
    password: string;
}

interface User {
    // Define user properties here...
}

const login = (credentials: Credentials): Promise<AxiosResponse<User>> => {
    return axios.post('/api/auth/login', credentials);
};

const register = (user: User): Promise<AxiosResponse<User>> => {
    return axios.post('/api/auth/register', user);
};

export default {
    login,
    register,
    // other auth related API calls...
};