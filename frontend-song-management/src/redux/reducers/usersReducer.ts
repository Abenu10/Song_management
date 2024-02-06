import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    date: Date;
    profile: string;
}

const usersSlice = createSlice({
    name: 'users',
    initialState: null as User | null,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => action.payload,
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state) {
                return { ...state, ...action.payload }
            }
        },
    },
})

export const { setUser, updateUser } = usersSlice.actions
export default usersSlice.reducer