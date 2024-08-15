import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import { Auth } from '../../types/auth';
import { User } from '../../types/user';
import { Page } from '../../types/pages';

const initialState: Auth = {
    isAuthenticated: false,
    user: null,
    token: null,
    pages: [],
    status: 0
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ 
            user: User; 
            token: string; 
            pages: Page[] 
        }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.pages = action.payload.pages;
          },
          logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.pages = [];
          },
          setAuthData: (state, action: PayloadAction<Auth>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.pages = action.payload.pages;
          },
    }
});

export const {login, logout, setAuthData} = authSlice.actions;

export default authSlice.reducer;
