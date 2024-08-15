import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {UserTypeXREFSitemap} from "../../types/userTypeXREPSitemap";

const initialState: UserTypeXREFSitemap[] = [];

const userTypeXREFSitemapSlice = createSlice({
    name: 'userTypeXREFSitemaps',
    initialState,
    reducers: {
        setUserTypeXREFSitemaps: (state, action: PayloadAction<UserTypeXREFSitemap[]>) => {
            return action.payload;
        },
    }
});

export const {setUserTypeXREFSitemaps} = userTypeXREFSitemapSlice.actions;

export default userTypeXREFSitemapSlice.reducer;