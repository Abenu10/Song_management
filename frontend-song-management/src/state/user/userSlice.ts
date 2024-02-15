import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: any;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.error = null;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { fetchSuccess, fetchFailure } = userSlice.actions;

export default userSlice.reducer;