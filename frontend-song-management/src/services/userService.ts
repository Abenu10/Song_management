import axios, { AxiosResponse } from 'axios';

interface User {
    _id: string
    name: string
    email: string
    avatar: string
    date: Date
    profile: string
}

const getUsers = (): Promise<AxiosResponse<User[]>> => {
    return axios.get('/api/users');
};

const getUser = (id: string): Promise<AxiosResponse<User>> => {
    return axios.get(`/api/users/${id}`);
};

const createUser = (user: User): Promise<AxiosResponse<User>> => {
    return axios.post('/api/users', user);
};

const updateUser = (id: string, user: User): Promise<AxiosResponse<User>> => {
    return axios.put(`/api/users/${id}`, user);
};

const deleteUser = (id: string): Promise<AxiosResponse<void>> => {
    return axios.delete(`/api/users/${id}`);
};

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};