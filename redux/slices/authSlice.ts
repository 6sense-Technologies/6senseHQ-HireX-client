import { AuthState, Tokens, UserInfo } from '@/types/Auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  tokens: {
    access_token: '',
    refresh_token: '',
  },
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ tokens: Tokens; userInfo: UserInfo | null }>
    ) => {
      state.tokens = action.payload.tokens;
      state.userInfo = action.payload.userInfo;
    },
    clearAuthData: (state) => {
      state.tokens = initialState.tokens;
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
