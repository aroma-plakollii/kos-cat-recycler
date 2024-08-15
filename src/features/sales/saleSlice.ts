import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Sale} from "../../types/sale";

const initialState: Sale[] = [];

const saleSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        setSales: (state, action: PayloadAction<Sale[]>) => {
            return action.payload;
        },
        resetSales: (state) => {
            return [];
        },
    }
});

export const {setSales, resetSales} = saleSlice.actions;

export default saleSlice.reducer;