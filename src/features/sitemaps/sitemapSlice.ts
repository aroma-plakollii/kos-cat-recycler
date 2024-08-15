import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Sitemap} from "../../types/sitemap";

const initialState: Sitemap[] = [];

const sitemapSlice = createSlice({
    name: 'sitemaps',
    initialState,
    reducers: {
        setSitemaps: (state, action: PayloadAction<Sitemap[]>) => {
            return action.payload;
        },
    }
});

export const {setSitemaps} = sitemapSlice.actions;

export default sitemapSlice.reducer;