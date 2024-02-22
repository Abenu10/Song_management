import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: any;
  isFetching: boolean
    error: boolean
}

const initialState: UserState = {
  user: null,
  error: false,
  isFetching:false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserDetailsStart: (state) => {
      state.isFetching = true;
    },
    fetchUserDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.isFetching = false;
      state.user = action.payload;
      state.error = false;
    },
    fetchUserDetailsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { fetchUserDetailsStart, fetchUserDetailsSuccess, fetchUserDetailsFailure } = userSlice.actions;

export default userSlice.reducer;