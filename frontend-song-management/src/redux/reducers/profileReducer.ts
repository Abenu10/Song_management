// profileReducer.ts
import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
    name: 'profile',
    initialState: null,
    reducers: {
        setProfile: (state, action) => action.payload,
        updateProfile: (state, action) => ({ ...state, ...action.payload }),
    },
})

export const { setProfile, updateProfile } = profileSlice.actions
export default profileSlice.reducer
